import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authMiddleware } from '../../../../middlewares/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('🔍 [GET] /api/flashcards/[id] - Iniciando requisição');
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
    console.log('🎯 ID do deck recebido:', id);

    // Valida se o ID é um número válido
    const deckId = parseInt(id);
    if (isNaN(deckId)) {
      console.log('❌ ID inválido:', id);
      return NextResponse.json(
        { error: 'ID do deck deve ser um número válido' },
        { status: 400 }
      );
    }

    // Busca o deck com seus cards
    console.log('🔍 Buscando deck e cards...');
    const deck = await prisma.flashcardDeck.findUnique({
      where: {
        id: deckId,
      },
      include: {
        cards: true,
      },
    });
    console.log('📦 Deck encontrado:', deck);

    if (!deck) {
      console.log('❌ Deck não encontrado');
      return NextResponse.json(
        { error: 'Deck não encontrado' },
        { status: 404 }
      );
    }

    console.log('✅ Operação concluída com sucesso');
    return NextResponse.json({ deck });
  } catch (error) {
    console.error('🔥 Erro ao buscar deck:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar deck' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('🔄 [PUT] /api/flashcards/[id] - Iniciando requisição');
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

    if (!auth.user?.role || auth.user.role !== 'ADMIN') {
      console.log('❌ Usuário não é admin:', auth.user?.role);
      return NextResponse.json(
        { error: 'Apenas administradores podem editar decks' },
        { status: 403 }
      );
    }

    const { id } = params;
    console.log('🎯 ID do deck:', id);

    const body = await request.json();
    console.log('📝 Dados recebidos:', body);

    // Atualiza o deck
    console.log('🔄 Atualizando deck...');
    const updatedDeck = await prisma.flashcardDeck.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: body.title,
        description: body.description,
        level: body.level,
        category: body.category,
      },
      include: {
        cards: true,
      },
    });
    console.log('📦 Deck atualizado:', updatedDeck);

    console.log('✅ Operação concluída com sucesso');
    return NextResponse.json({ deck: updatedDeck });
  } catch (error) {
    console.error('🔥 Erro ao atualizar deck:', error);
    return NextResponse.json(
      { error: 'Erro interno ao atualizar deck' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('❌ [DELETE] /api/flashcards/[id] - Iniciando requisição');
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

    if (!auth.user?.role || auth.user.role !== 'ADMIN') {
      console.log('❌ Usuário não é admin:', auth.user?.role);
      return NextResponse.json(
        { error: 'Apenas administradores podem deletar decks' },
        { status: 403 }
      );
    }

    const { id } = params;
    console.log('🎯 ID do deck:', id);

    // Deleta o deck (os cards serão deletados automaticamente devido ao onDelete: Cascade)
    console.log('❌ Deletando deck...');
    await prisma.flashcardDeck.delete({
      where: {
        id: parseInt(id),
      },
    });

    console.log('✅ Operação concluída com sucesso');
    return NextResponse.json({ message: 'Deck deletado com sucesso' });
  } catch (error) {
    console.error('🔥 Erro ao deletar deck:', error);
    return NextResponse.json(
      { error: 'Erro interno ao deletar deck' },
      { status: 500 }
    );
  }
} 