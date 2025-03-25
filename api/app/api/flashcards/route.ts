import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authMiddleware } from '../../../middlewares/auth';

export async function GET(request: Request) {
  try {
    // Verifica autenticação
    const auth = await authMiddleware(request);
    if (!auth.success) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    // Busca todos os flashcards
    const flashcards = await prisma.flashcardDeck.findMany({
      include: {
        cards: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ flashcards });
  } catch (error) {
    console.error('Erro ao buscar flashcards:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar flashcards' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  console.log('🔍 [POST] /api/flashcards - Iniciando criação');
  
  try {
    // Verifica autenticação e se é admin
    const auth = await authMiddleware(request);
    if (!auth.success) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }
    if (auth.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Apenas administradores podem criar flashcards' },
        { status: 403 }
      );
    }

    const body = await request.json();
    console.log('📝 Dados recebidos:', body);
    const { title, description, level, category, cards } = body;

    // Valida os dados
    if (!title || !level || !category) {
      return NextResponse.json(
        { error: 'Título, nível e categoria são obrigatórios' },
        { status: 400 }
      );
    }

    if (!cards || !Array.isArray(cards) || cards.length === 0) {
      return NextResponse.json(
        { error: 'É necessário fornecer pelo menos um card' },
        { status: 400 }
      );
    }

    // Cria o deck e os cards em uma única transação
    console.log('📝 Criando deck e cards em transação...');
    const result = await prisma.$transaction(async (prisma) => {
      // 1. Cria o deck
      const deck = await prisma.flashcardDeck.create({
        data: {
          title,
          description,
          level,
          category,
          published: true,
        },
      });

      console.log('✅ Deck criado:', deck);

      // 2. Cria os cards
      const createdCards = await Promise.all(
        cards.map(async (card: any) => {
          return prisma.flashcard.create({
            data: {
              front: card.term,
              back: card.definition,
              example: card.example || '',
              deckId: deck.id,
            },
          });
        })
      );

      console.log('✅ Cards criados:', createdCards);

      // 3. Retorna o deck com os cards
      return prisma.flashcardDeck.findUnique({
        where: { id: deck.id },
        include: { cards: true },
      });
    });

    console.log('✅ Transação concluída com sucesso');
    return NextResponse.json({ deck: result }, { status: 201 });
  } catch (error) {
    console.error('🔥 Erro ao criar flashcard:', error);
    return NextResponse.json(
      { error: 'Erro interno ao criar flashcard' },
      { status: 500 }
    );
  }
} 