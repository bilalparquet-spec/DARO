import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { isUndefined } from 'lodash';
import { z } from 'zod';

import prisma from '@/server/db';
import getCurrentUser from '@/utils/getCurrentUser';

async function hasAddToWishList(listingId: string) {
  return await prisma.wishItem.findFirst({
    where: {
      listingId
    }
  });
}

export async function POST(request: ExpoRequest) {
  const body = await request.json();

  const schema = z.object({
    listingId: z.string(),
    wishListId: z.optional(z.string())
  });
  const parsedRes = schema.safeParse(body);

  // TODO: middleware
  if (!parsedRes.success) {
    return new ExpoResponse(parsedRes.error.message, {
      status: 400
    });
  }

  const user = await getCurrentUser(request);
  const { listingId, wishListId } = parsedRes.data;

  if (await hasAddToWishList(listingId)) {
    return ExpoResponse.json({ hasAddToWishList: true });
  }

  // if not provided, default to the most recently updated wishList
  if (isUndefined(wishListId)) {
    const recentWishList = await prisma.wishList.findFirst({
      where: {
        userId: user.id
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    if (!recentWishList) {
      // no wishList exists, need to create one
      return ExpoResponse.json({ isEmpty: true });
    }

    const wishItem = await prisma.wishItem.create({
      data: {
        listingId,
        wishListId: recentWishList.id
      }
    });

    // update the wishList updatedAt timestamp
    await prisma.wishList.update({
      where: {
        id: recentWishList.id
      },
      data: {
        updatedAt: new Date()
      }
    });

    return ExpoResponse.json({ success: true, wishListName: recentWishList.name, ...wishItem });
  } else {
    const wishList = await prisma.wishList.findFirstOrThrow({
      where: {
        id: wishListId
      }
    });

    const wishItem = await prisma.wishItem.create({
      data: {
        listingId,
        wishListId
      }
    });

    // update the wishList updatedAt timestamp
    await prisma.wishList.update({
      where: {
        id: wishListId
      },
      data: {
        updatedAt: new Date()
      }
    });

    return ExpoResponse.json({ success: true, wishListName: wishList.name, ...wishItem });
  }
}
