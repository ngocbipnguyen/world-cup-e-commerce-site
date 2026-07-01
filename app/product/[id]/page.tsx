import { ProductDetailPageClient } from '@/components/ProductDetailPageClient'

// Mock product data - in real app this would come from database
const PRODUCTS: Record<string, any> = {
  japan: {
    productId: 'japan-2026',
    team: 'Japan',
    title: 'Japan 2026 Home Legacy Jersey',
    images: [
      { id: '1', url: '/jersey-japan.png', alt: 'Front view' },
      { id: '2', url: '/jersey-japan.png', alt: 'Back view' },
      { id: '3', url: '/jersey-japan.png', alt: 'Fabric detail' },
    ],
    price: 84.99,
    originalPrice: 119.99,
    rating: 4,
    reviews: 64,
    description: 'The Japan 2026 Home Legacy Jersey is a premium tribute to the Japanese national team\'s rich football heritage. Crafted with state-of-the-art fabric technology and authentic official crests, this jersey delivers exceptional comfort and durability for fans and players alike. Whether you\'re supporting from the stands or wearing it with pride, this jersey represents the legacy and spirit of Japanese football on the world stage.',
    fabricTech: [
      'Moisture-Wicking Technology: Advanced sweat-wicking mesh keeps you dry during intense moments',
      '100% Recycled Polyester: Eco-friendly fabric made from recycled materials without compromising performance',
      'Authentic Heat-Applied Crest: Official federation crest applied with precision heat technology',
      'Breathable Mesh Panels: Strategic mesh placement for maximum ventilation and airflow',
    ],
  },
  france: {
    productId: 'france-2026',
    team: 'France',
    title: 'France 2026 Home Premium Jersey',
    images: [
      { id: '1', url: '/jersey-france.png', alt: 'Front view' },
      { id: '2', url: '/jersey-france.png', alt: 'Back view' },
      { id: '3', url: '/jersey-france.png', alt: 'Fabric detail' },
    ],
    price: 109.99,
    originalPrice: 139.99,
    rating: 5,
    reviews: 156,
    description: 'The France 2026 Home Premium Jersey showcases the elegant design of Les Bleus. This premium authentic jersey features the official French Football Federation crest and employs cutting-edge fabric technology for superior performance. Experience the prestige and tradition of French football with this iconic jersey.',
    fabricTech: [
      'Moisture-Wicking Technology: Advanced sweat-wicking mesh keeps you dry during intense moments',
      '100% Recycled Polyester: Eco-friendly fabric made from recycled materials without compromising performance',
      'Authentic Heat-Applied Crest: Official federation crest applied with precision heat technology',
      'Breathable Mesh Panels: Strategic mesh placement for maximum ventilation and airflow',
    ],
  },
  argentina: {
    productId: 'argentina-2026',
    team: 'Argentina',
    title: 'Argentina 2026 Home Authentic Jersey',
    images: [
      { id: '1', url: '/jersey-argentina.png', alt: 'Front view' },
      { id: '2', url: '/jersey-argentina.png', alt: 'Back view' },
      { id: '3', url: '/jersey-argentina.png', alt: 'Fabric detail' },
    ],
    price: 89.99,
    originalPrice: 119.99,
    rating: 5,
    reviews: 124,
    description: 'The Argentina 2026 Home Authentic Jersey is a classic representation of the iconic light blue and white stripes that represent the nation\'s football pride. This authentic jersey features the official Argentine Football Association crest and employs premium performance fabrics to ensure comfort during wear.',
    fabricTech: [
      'Moisture-Wicking Technology: Advanced sweat-wicking mesh keeps you dry during intense moments',
      '100% Recycled Polyester: Eco-friendly fabric made from recycled materials without compromising performance',
      'Authentic Heat-Applied Crest: Official federation crest applied with precision heat technology',
      'Breathable Mesh Panels: Strategic mesh placement for maximum ventilation and airflow',
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(PRODUCTS).map((id) => ({
    id,
  }))
}

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const product = PRODUCTS[id]

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <a href="/" className="text-primary hover:underline">
            Return to Home
          </a>
        </div>
      </div>
    )
  }

  return <ProductDetailPageClient product={product} />
}
