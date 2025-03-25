import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authMiddleware } from '../../../../../../middlewares/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string; cardId: string } }
) {
  try {
    // Verifica autenticação
    const auth = await authMiddleware(request);
    if (!auth.success) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { cardId } = params;

    // Busca o card
    const card = await prisma.flashcard.findUnique({
      where: {
        id: parseInt(cardId),
      },
    });

    if (!card) {
      return NextResponse.json({ error: 'Card não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ card });
  } catch (error) {
    console.error('Erro ao buscar card:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar card' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string; cardId: string } }
) {
  try {
    // Verifica autenticação e se é admin
    const auth = await authMiddleware(request);
    if (!auth.success) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }
    if (!auth.user?.role || auth.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Apenas administradores podem editar cards' },
        { status: 403 }
      );
    }

    const { cardId } = params;
    const body = await request.json();
    const { front, back } = body;

    // Valida os dados
    if (!front || !back) {
      return NextResponse.json(
        { error: 'Frente e verso são obrigatórios' },
        { status: 400 }
      );
    }

    // Atualiza o card
    const card = await prisma.flashcard.update({
      where: {
        id: parseInt(cardId),
      },
      data: {
        front,
        back,
      },
    });

    return NextResponse.json({ card });
  } catch (error) {
    console.error('Erro ao atualizar card:', error);
    return NextResponse.json(
      { error: 'Erro interno ao atualizar card' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; cardId: string } }
) {
  try {
    // Verifica autenticação e se é admin
    const auth = await authMiddleware(request);
    if (!auth.success) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }
    if (!auth.user?.role || auth.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Apenas administradores podem deletar cards' },
        { status: 403 }
      );
    }

    const { cardId } = params;

    // Deleta o card
    await prisma.flashcard.delete({
      where: {
        id: parseInt(cardId),
      },
    });

    return NextResponse.json({ message: 'Card deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar card:', error);
    return NextResponse.json(
      { error: 'Erro interno ao deletar card' },
      { status: 500 }
    );
  }
} 