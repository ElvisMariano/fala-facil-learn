import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authMiddleware } from '../../../../../middlewares/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verifica autenticação
    const auth = await authMiddleware(request);
    if (!auth.success) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { id } = params;

    // Verifica se o deck existe
    const deck = await prisma.flashcardDeck.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!deck) {
      return NextResponse.json({ error: 'Deck não encontrado' }, { status: 404 });
    }

    // Busca os cards do deck
    const cards = await prisma.flashcard.findMany({
      where: {
        deckId: parseInt(id),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ cards });
  } catch (error) {
    console.error('Erro ao buscar cards:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar cards' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('🔍 [POST] /api/flashcards/[id]/cards - Iniciando requisição');
  console.log('📝 Parâmetros recebidos:', params);

  try {
    // Verifica autenticação e se é admin
    console.log('🔒 Verificando autenticação...');
    const auth = await authMiddleware(request);
    console.log('👤 Resultado da autenticação:', auth);

    if (!auth.success) {
      console.log('❌ Autenticação falhou:', auth.error);
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    if (!auth.user?.role) {
      console.log('❌ Usuário sem role definida');
      return NextResponse.json(
        { error: 'Usuário sem permissões adequadas' },
        { status: 403 }
      );
    }

    if (auth.user.role !== 'ADMIN') {
      console.log('❌ Usuário não é admin:', auth.user.role);
      return NextResponse.json(
        { error: 'Apenas administradores podem criar cards' },
        { status: 403 }
      );
    }

    const { id } = params;
    console.log('🎯 ID do deck:', id);

    // Verifica se o deck existe
    console.log('🔍 Buscando deck...');
    const deck = await prisma.flashcardDeck.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    console.log('📦 Deck encontrado:', deck);

    if (!deck) {
      console.log('❌ Deck não encontrado');
      return NextResponse.json({ error: 'Deck não encontrado' }, { status: 404 });
    }

    const body = await request.json();
    console.log('📝 Dados recebidos:', body);
    const { front, back, example } = body;

    // Valida os dados
    if (!front || !back) {
      console.log('❌ Dados inválidos - front ou back ausentes');
      return NextResponse.json(
        { error: 'Frente e verso são obrigatórios' },
        { status: 400 }
      );
    }

    // Cria o card
    console.log('📝 Criando card...');
    const card = await prisma.flashcard.create({
      data: {
        front,
        back,
        example,
        deckId: parseInt(id),
      },
    });
    console.log('✅ Card criado:', card);

    // Retorna o card criado junto com o deck atualizado
    console.log('🔄 Buscando deck atualizado...');
    const updatedDeck = await prisma.flashcardDeck.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        cards: true,
      },
    });
    console.log('📦 Deck atualizado:', updatedDeck);

    console.log('✅ Operação concluída com sucesso');
    return NextResponse.json({ 
      card,
      deck: updatedDeck
    }, { status: 201 });
  } catch (error) {
    console.error('🔥 Erro ao criar card:', error);
    return NextResponse.json(
      { error: 'Erro interno ao criar card' },
      { status: 500 }
    );
  }
} 