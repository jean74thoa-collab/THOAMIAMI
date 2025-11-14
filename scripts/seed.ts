
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const artistsData = [
  {
    name: 'Alois Hunka',
    slug: 'alois-hunka',
    bio: 'Contemporary artist known for innovative abstract compositions and experimental techniques.',
    profileImage: 'https://aloishunka.com.br/wp-content/uploads/2025/05/Alinhado-2-1.jpg',
    category: 'Contemporary',
    featured: true,
  },
  {
    name: 'Binho Ribeiro',
    slug: 'binho-ribeiro',
    bio: 'Pioneer of street art in Brazil and Latin America since 1984, with exhibitions worldwide including São Paulo, Buenos Aires, Tokyo, Paris, Los Angeles, and New York.',
    profileImage: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitvfYn41M3f9cvFf6N9iM-KKdOmyNgTpCMhOrJCDo__FHlMueKJ0pSt5pwmfAV3Vy9VLyqnI0QIs_LlSDNEjVX28CXVo90qF3P4f09qAWn6uh-NynZ7byphmnYdkKssOFN9x7CfzzTHZA/s1600/binho+ribeiro.jpg',
    category: 'Street Art',
    featured: true,
  },
  {
    name: 'Bruna Snaiderman',
    slug: 'bruna-snaiderman',
    bio: 'Contemporary artist exploring vibrant compositions and dynamic visual relationships.',
    profileImage: 'https://i.pinimg.com/originals/4b/e9/a0/4be9a07a74b8d96447ec062797ca5dda.jpg',
    category: 'Contemporary',
    featured: true,
  },
  {
    name: 'Eva Soban',
    slug: 'eva-soban',
    bio: 'Sophisticated contemporary artist known for elegant and refined artistic expressions.',
    profileImage: 'https://static.abacusaicdn.net/images/908a8069-0c6e-4cdb-b8e5-94f39ce04ca2.jpg',
    category: 'Contemporary',
    featured: false,
  },
  {
    name: 'Fernanda Figueiredo',
    slug: 'fernanda-figueiredo',
    bio: 'Artist exploring contemporary themes through innovative visual narratives.',
    profileImage: 'https://artlogic-res.cloudinary.com/w_1200,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite1870/usr/images/artists/artist_image/items/cc/cc3e3a0f5e5c4e88b3747b866382b0e5/fernanda-figueiredo-profile-pic-b-w.jpg',
    category: 'Contemporary',
    featured: false,
  },
  {
    name: 'Guava De Art',
    slug: 'guava-de-art',
    bio: 'Creative artist known for vibrant expressions and unique artistic perspectives.',
    profileImage: 'https://images.squarespace-cdn.com/content/v1/60454f859016994088a48cd3/688bda54-5ecb-4920-b440-1388fee72594/20210209_165057.jpg',
    category: 'Contemporary',
    featured: false,
  },
  {
    name: 'Jordan Betten',
    slug: 'jordan-betten',
    bio: 'Artist and designer, founder of Lost Art, known for innovative design approaches.',
    profileImage: 'https://www.mashgallery.com/wp-content/uploads/2022/11/jordan-betten-artist-and-designer-founder-of-lost-art-portrait-photo-by-david-carlo.webp',
    category: 'Design',
    featured: false,
  },
  {
    name: 'Juan Henriquez',
    slug: 'juan-henriquez',
    bio: 'Contemporary artist exploring modern themes and visual storytelling.',
    profileImage: 'https://voyagemia.com/wp-content/uploads/2022/09/c-PersonalJUANHENRIQUEZ__Juanhenriquezheadshot1_1660450285918-e1661686202640.jpg',
    category: 'Contemporary',
    featured: false,
  },
  {
    name: 'Laerte Ramos',
    slug: 'laerte-ramos',
    bio: 'Curator and artist with expertise in contemporary art curation and creation.',
    profileImage: 'https://static.wixstatic.com/media/3696d3_8c15faff4457417eab422f47062f55ff~mv2.png/v1/fill/w_483,h_385,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Laerte%20Curador.png',
    category: 'Curatorial',
    featured: false,
  },
  {
    name: 'Miguel Gontijo',
    slug: 'miguel-gontijo',
    bio: 'Artist known for vibrant compositions and contemporary artistic expressions.',
    profileImage: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjYzXA46I4Q7Q1ZtABO7jfJrDCGdongbvELebSvFwqkKD9k-cRSxdmcWdFp3G04GP1mQqqthHucRrZUbagqFF7NXq6DT63beVbLgnA-7CoeRQGBNjzt1u_8AEEe8op5Fi_33AFbY1-R1bAwQM1yV8j8Kk3H60t4JlYhSDD1VCcW9j8trY6GKuxj6A7HmVnm/s3428/convite-MIGUELGONTIJO-FINAL.jpg',
    category: 'Contemporary',
    featured: false,
  },
  {
    name: 'Oslawansky',
    slug: 'oslawansky',
    bio: 'Contemporary Brazilian artist known for creative and sophisticated artistic expressions.',
    profileImage: 'https://static.abacusaicdn.net/images/a2e1dc36-2621-48e8-9642-3abb8b92f1cf.jpg',
    category: 'Contemporary',
    featured: false,
  },
  {
    name: 'Yuli Geszti',
    slug: 'yuli-geszti',
    bio: 'Artist exploring contemporary themes through innovative visual approaches.',
    profileImage: 'https://artlogic-res.cloudinary.com/w_1200,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite1870/usr/images/artists/artist_image/items/08/08bc1eb3c8d04885be0393021372bf01/yuli-geszti-deck.jpg',
    category: 'Contemporary',
    featured: false,
  },
  {
    name: 'Zevi G',
    slug: 'zevi-g',
    bio: 'Contemporary artist known for innovative expressions and creative visual narratives.',
    profileImage: 'https://images.squarespace-cdn.com/content/v1/59e6b459dc2b4afd61b4d20f/4acb0250-83c9-42ab-9233-75164e60e73e/image2.jpeg',
    category: 'Contemporary',
    featured: false,
  },
]

const artworksData = [
  {
    title: 'Untitled 8',
    slug: 'untitled-8',
    description: 'Abstract composition exploring form and color relationships.',
    imageUrl: 'https://images.pexels.com/photos/1070534/pexels-photo-1070534.jpeg',
    medium: 'Mixed Media',
    dimensions: '100 x 80 cm',
    year: 2023,
    price: 5000,
    available: false,
    featured: true,
    artistSlug: 'alois-hunka',
  },
  {
    title: 'A Experiência Original',
    slug: 'a-experiencia-original',
    description: 'Original street art composition showcasing urban narrative.',
    imageUrl: 'https://artlogic-res.cloudinary.com/w_1200,c_limit,f_auto,fl_lossy,q_auto/artlogicstorage/thehouseofarts/images/view/01415d5e692c53ff6bd477b337212247p/thehouseofarts-binho-ribeiro-a-experi-ncia-original-2020.png',
    medium: 'Acrylic on Canvas',
    dimensions: '120 x 80 cm',
    year: 2020,
    price: 5000,
    available: true,
    featured: true,
    artistSlug: 'binho-ribeiro',
  },
  {
    title: 'O Peixe entre as Escritas',
    slug: 'o-peixe-entre-as-escritas',
    description: 'Street art piece combining text and imagery in urban context.',
    imageUrl: 'https://www.democrart.com.br/cdn/shop/files/democrart_galeria_de_arte_quadros_horizontal_grafite_binho_ribeiro_Peixe_no_muro_vermelho.jpg',
    medium: 'Spray Paint on Wall',
    dimensions: '200 x 150 cm',
    year: 2016,
    price: 2900,
    available: true,
    featured: false,
    artistSlug: 'binho-ribeiro',
  },
  {
    title: 'Coração Em Chamas',
    slug: 'coracao-em-chamas',
    description: 'Passionate expression of emotion through vibrant street art.',
    imageUrl: 'https://artlogic-res.cloudinary.com/w_1200,c_limit,f_auto,fl_lossy,q_auto/artlogicstorage/thehouseofarts/images/view/a020bdef88e2ff33bb444d76bb57e6eep/thehouseofarts-binho-ribeiro-cora-o-em-chamas-2021.png',
    medium: 'Acrylic on Canvas',
    dimensions: '100 x 100 cm',
    year: 2021,
    price: 3800,
    available: true,
    featured: true,
    artistSlug: 'binho-ribeiro',
  },
  {
    title: 'A Senhora das Cores',
    slug: 'a-senhora-das-cores',
    description: 'Colorful composition celebrating feminine strength and beauty.',
    imageUrl: 'https://i.pinimg.com/originals/e7/2b/fd/e72bfd0a989de75887208b9feea81369.jpg',
    medium: 'Acrylic on Canvas',
    dimensions: '80 x 60 cm',
    year: 2017,
    price: 3200,
    available: true,
    featured: false,
    artistSlug: 'binho-ribeiro',
  },
  {
    title: 'Mickey em Fragmentos Vitrais',
    slug: 'mickey-em-fragmentos-vitrais',
    description: 'Pop art interpretation using stained glass aesthetic.',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgZ3xD6BDyUN0lz4xZizYVmtacRqqt1tWNQMK_nznB-a4EMk8IDcylc3t5k8JGe1SxbIp8EMuaxPw2LqaDikahTLIca8jQFqcF1BNabCeII1KRfVC-6_fUpPbUD_utCHCuC5AYXAX1kbxE/s1600/binho7.jpg',
    medium: 'Mixed Media',
    dimensions: '90 x 90 cm',
    year: 2024,
    price: 3200,
    available: true,
    featured: false,
    artistSlug: 'binho-ribeiro',
  },
  {
    title: 'Duo Vibration 1',
    slug: 'duo-vibration-1',
    description: 'Dynamic composition exploring vibrant color relationships.',
    imageUrl: 'https://artlogic-res.cloudinary.com/w_1200,c_limit,f_auto,fl_lossy,q_auto/artlogicstorage/thehouseofarts/images/view/6a6b613674a7e87e8461a910adf17ebep/thehouseofarts-bruna-snaiderman.png',
    medium: 'Acrylic on Canvas',
    dimensions: '120 x 100 cm',
    year: 2023,
    price: 5700,
    available: false,
    featured: true,
    artistSlug: 'bruna-snaiderman',
  },
]

const exhibitionsData = [
  {
    title: 'Contemporary Voices',
    slug: 'contemporary-voices',
    description: 'A group exhibition showcasing emerging contemporary artists from Latin America.',
    imageUrl: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-05-15'),
    location: 'THE HOUSE OF ARTS, Miami',
    featured: true,
  },
  {
    title: 'Street Art Revolution',
    slug: 'street-art-revolution',
    description: 'Celebrating the evolution of street art from urban walls to gallery spaces.',
    imageUrl: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-08-01'),
    location: 'THE HOUSE OF ARTS, Miami',
    featured: true,
  },
  {
    title: 'Digital Dreams',
    slug: 'digital-dreams',
    description: 'Exploring the intersection of traditional art and digital innovation.',
    imageUrl: 'https://i.pinimg.com/474x/03/ec/d6/03ecd6f8d5486878f7e75344e61fc5b8.jpg',
    startDate: new Date('2024-09-15'),
    endDate: new Date('2024-11-15'),
    location: 'THE HOUSE OF ARTS, Miami',
    featured: false,
  },
]

async function main() {
  console.log('Starting seed...')

  // Create artists
  for (const artistData of artistsData) {
    const artist = await prisma.artist.upsert({
      where: { slug: artistData.slug },
      update: {},
      create: artistData,
    })
    console.log(`Created artist: ${artist.name}`)
  }

  // Create artworks
  for (const artworkData of artworksData) {
    const artist = await prisma.artist.findUnique({
      where: { slug: artworkData.artistSlug },
    })

    if (artist) {
      const { artistSlug, ...artworkDataWithoutArtistSlug } = artworkData
      const artwork = await prisma.artwork.upsert({
        where: { slug: artworkData.slug },
        update: {},
        create: {
          ...artworkDataWithoutArtistSlug,
          artistId: artist.id,
        },
      })
      console.log(`Created artwork: ${artwork.title}`)
    }
  }

  // Create exhibitions
  for (const exhibitionData of exhibitionsData) {
    const exhibition = await prisma.exhibition.upsert({
      where: { slug: exhibitionData.slug },
      update: {},
      create: exhibitionData,
    })
    console.log(`Created exhibition: ${exhibition.title}`)
  }

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
