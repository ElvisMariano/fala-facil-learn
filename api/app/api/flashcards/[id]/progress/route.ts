import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authMiddleware } from '../../../../../middlewares/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('🔍 [POST] /api/flashcards/[id]/progress - Iniciando requisição');
  console.log('📝 Parâmetros recebidos:', params);

  try {
    // Verifica autenticação
    console.log('🔒 Verificando autenticação...');
    const auth = await authMiddleware(request);
    console.log('👤 Resultado da autenticação:', auth);

    if (!auth.success) {
      console.log('❌ Autenticação falhou:', auth.error);
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { id } = params;
    console.log('🎯 ID do deck:', id);

    const body = await request.json();
    console.log('📝 Dados recebidos:', body);
    const { cardId, difficulty } = body;

    // Valida os dados
    if (!cardId || !difficulty) {
      console.log('❌ Dados inválidos - cardId ou difficulty ausentes');
      return NextResponse.json(
        { error: 'ID do card e dificuldade são obrigatórios' },
        { status: 400 }
      );
    }

    // Verifica se o deck existe
    console.log('🔍 Verificando deck...');
    const deck = await prisma.flashcardDeck.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!deck) {
      console.log('❌ Deck não encontrado');
      return NextResponse.json({ error: 'Deck não encontrado' }, { status: 404 });
    }

    // Verifica se o card existe e pertence ao deck
    console.log('🔍 Verificando card...');
    const card = await prisma.flashcard.findFirst({
      where: {
        id: parseInt(cardId),
        deckId: parseInt(id),
      },
    });

    if (!card) {
      console.log('❌ Card não encontrado ou não pertence ao deck');
      return NextResponse.json(
        { error: 'Card não encontrado ou não pertence ao deck' },
        { status: 404 }
      );
    }

    // Atualiza ou cria o progresso
    console.log('🔄 Atualizando progresso...');
    const progress = await prisma.flashcardProgress.upsert({
      where: {
        userId_deckId_cardId: {
          userId: auth.user.id,
          deckId: parseInt(id),
          cardId: parseInt(cardId),
        },
      },
      update: {
        difficulty,
        lastStudiedAt: new Date(),
        studyCount: {
          increment: 1,
        },
      },
      create: {
        userId: auth.user.id,
        deckId: parseInt(id),
        cardId: parseInt(cardId),
        difficulty,
      },
    });
    console.log('✅ Progresso atualizado:', progress);

    // Retorna o progresso atualizado
    console.log('✅ Operação concluída com sucesso');
    return NextResponse.json({ progress });
  } catch (error) {
    console.error('🔥 Erro ao atualizar progresso:', error);
    return NextResponse.json(
      { error: 'Erro interno ao atualizar progresso' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('🔍 [GET] /api/flashcards/[id]/progress - Iniciando requisição');
  console.log('📝 Parâmetros recebidos:', params);

  try {
    // Verifica autenticação
    console.log('🔒 Verificando autenticação...');
    const auth = await authMiddleware(request);
    console.log('👤 Resultado da autenticação:', auth);

    if (!auth.success) {
      console.log('❌ Autenticação falhou:', auth.error);
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { id } = params;
    console.log('🎯 ID do deck:', id);

    // Busca o progresso do usuário para o deck
    console.log('🔍 Buscando progresso...');
    const progress = await prisma.flashcardProgress.findMany({
      where: {
        userId: auth.user.id,
        deckId: parseInt(id),
      },
      include: {
        card: true,
      },
    });
    console.log('📦 Progresso encontrado:', progress);

    console.log('✅ Operação concluída com sucesso');
    return NextResponse.json({ progress });
  } catch (error) {
    console.error('🔥 Erro ao buscar progresso:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar progresso' },
      { status: 500 }
    );
  }
} 