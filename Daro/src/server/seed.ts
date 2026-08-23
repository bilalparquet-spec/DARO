/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// صور عامة مجانية (Unsplash CDN المباشر، وليس Unsplash Source API المتوقف)
const HOST_AVATARS = [
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
  'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=200'
];

const LISTING_IMAGES = [
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
  'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
];

const CATEGORIES = [
  { name: 'شقق', icon: 'home-outline', color: '#dfeafb', img: LISTING_IMAGES[0] },
  { name: 'فيلات', icon: 'business-outline', color: '#fbe8df', img: LISTING_IMAGES[1] },
  { name: 'استوديوهات', icon: 'bed-outline', color: '#e8fbdf', img: LISTING_IMAGES[2] },
  { name: 'إقامات ريفية', icon: 'leaf-outline', color: '#fbf3df', img: LISTING_IMAGES[3] }
];

// عناوين وأسعار واقعية موزّعة على ولايات جزائرية حقيقية
const LISTINGS = [
  {
    title: 'شقة عصرية بإطلالة على البحر - وهران',
    description: 'شقة أنيقة قريبة من كورنيش وهران، مؤثثة بالكامل مع كل وسائل الراحة.',
    wilaya: 'وهران',
    roomCount: 2,
    bathRoomCount: 1,
    bedCount: 2,
    guestCount: 4,
    price: 6500
  },
  {
    title: 'فيلا فاخرة بحديقة خاصة - الجزائر العاصمة',
    description: 'فيلا واسعة في حيدرة، مثالية للعائلات، مع موقف سيارات وحديقة.',
    wilaya: 'الجزائر',
    roomCount: 4,
    bathRoomCount: 3,
    bedCount: 4,
    guestCount: 8,
    price: 15000
  },
  {
    title: 'استوديو أنيق في وسط قسنطينة',
    description: 'استوديو مريح قريب من جسر سيدي مسيد، مثالي لرحلات العمل القصيرة.',
    wilaya: 'قسنطينة',
    roomCount: 1,
    bathRoomCount: 1,
    bedCount: 1,
    guestCount: 2,
    price: 3500
  },
  {
    title: 'منزل تقليدي بواحة تيميمون',
    description: 'إقامة فريدة في قلب الصحراء الجزائرية، تجربة لا تُنسى بين الكثبان.',
    wilaya: 'أدرار',
    roomCount: 3,
    bathRoomCount: 2,
    bedCount: 3,
    guestCount: 6,
    price: 8000
  },
  {
    title: 'شقة قريبة من شاطئ سيدي فرج',
    description: 'شقة مطلة على البحر مباشرة، على بعد خطوات من الشاطئ والمرسى.',
    wilaya: 'الجزائر',
    roomCount: 2,
    bathRoomCount: 1,
    bedCount: 2,
    guestCount: 4,
    price: 7200
  },
  {
    title: 'نزل جبلي هادئ في جيجل',
    description: 'إقامة هادئة وسط الطبيعة الخضراء، قريبة من شاطئ جيجل.',
    wilaya: 'جيجل',
    roomCount: 2,
    bathRoomCount: 1,
    bedCount: 3,
    guestCount: 5,
    price: 4800
  }
];

async function main() {
  console.log('بدء ملء قاعدة البيانات...');

  // إنشاء مستخدم مضيف تجريبي
  const hashedPassword = bcrypt.hashSync('password123', 8);
  const host = await prisma.user.upsert({
    where: { email: 'host@daro.dz' },
    update: {},
    create: {
      name: 'ياسين بومدين',
      email: 'host@daro.dz',
      password: hashedPassword,
      img: HOST_AVATARS[0],
      about: 'مضيف جزائري، أرحب بضيوفي في أفضل الإقامات عبر الوطن.',
      createdAt: new Date('2022-01-01')
    }
  });

  // إنشاء الفئات
  const createdCategories = [];
  for (const category of CATEGORIES) {
    const existing = await prisma.category.findFirst({ where: { name: category.name } });
    const created = existing || (await prisma.category.create({ data: category }));
    createdCategories.push(created);
  }

  // إنشاء المنشورات (listings)
  for (let i = 0; i < LISTINGS.length; i++) {
    const listing = LISTINGS[i];
    const category = createdCategories[i % createdCategories.length];

    const existing = await prisma.listing.findFirst({ where: { title: listing.title } });
    if (existing) continue;

    await prisma.listing.create({
      data: {
        title: listing.title,
        description: listing.description,
        imgs: [LISTING_IMAGES[i % LISTING_IMAGES.length], LISTING_IMAGES[(i + 1) % LISTING_IMAGES.length]],
        roomCount: listing.roomCount,
        bathRoomCount: listing.bathRoomCount,
        bedCount: listing.bedCount,
        guestCount: listing.guestCount,
        rating: Number((4 + Math.random()).toFixed(2)),
        price: listing.price,
        categoryId: category.id,
        userId: host.id
      }
    });
  }

  console.log('تم ملء قاعدة البيانات بنجاح ✅');
  console.log(`- ${createdCategories.length} فئات`);
  console.log(`- ${LISTINGS.length} منشورات`);
  console.log('بيانات تسجيل الدخول التجريبية: host@daro.dz / password123');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
