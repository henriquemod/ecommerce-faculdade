import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { User } from "@/types/user";

let id = 0;

const mock_veicules = [
  "https://uploadimage.io/images/2024/11/20/carro1.jpg",
  "https://uploadimage.io/images/2024/11/20/moto1.jpg",
  "https://uploadimage.io/images/2024/11/20/moto2.jpg",
];

const mock_electronics = [
  "https://uploadimage.io/images/2024/11/20/Leonardo_Phoenix_A_sleek_stateoftheart_electronic_device_stand_0.jpg",
  "https://uploadimage.io/images/2024/11/20/Leonardo_Phoenix_A_sleek_stateoftheart_electronic_device_stand_1.jpg",
  "https://uploadimage.io/images/2024/11/20/Leonardo_Phoenix_A_sleek_stateoftheart_electronic_device_stand_2.jpg",
  "https://uploadimage.io/images/2024/11/20/Leonardo_Phoenix_A_sleek_stateoftheart_electronic_device_stand_3.jpg",
];

const mock_clothing_images = [
  "https://uploadimage.io/images/2024/11/21/clothes_clothes_store_suit_dre-1.jpeg",
  "https://uploadimage.io/images/2024/11/21/clothes_clothes_store_suit_dre-2.jpeg",
  "https://uploadimage.io/images/2024/11/21/clothes_clothes_store_suit_dre.jpeg",
  "https://uploadimage.io/images/2024/11/21/dress_mannequin_sharp_focus_de.jpeg",
  "https://uploadimage.io/images/2024/11/21/dressing_sharp_focus_depth_of_.jpeg",
  "https://uploadimage.io/images/2024/11/21/t-shirt_soft_focus_depth_of_fi.jpeg",
];

export const mockUsers: User[] = [
  {
    id: 1,
    username: "joao_silva",
    email: "joao.silva@gmail.com",
    phone: "(11) 98765-4321",
  },
  {
    id: 2,
    username: "maria_santos",
    email: "maria.santos@hotmail.com",
    phone: "(21) 97654-3210",
  },
  {
    id: 3,
    username: "pedro_oliveira",
    email: "pedro.oliveira@outlook.com",
    phone: "(31) 96543-2109",
  },
  {
    id: 4,
    username: "ana_costa",
    email: "ana.costa@gmail.com",
    phone: "(41) 95432-1098",
  },
  {
    id: 5,
    username: "lucas_ferreira",
    email: "lucas.ferreira@hotmail.com",
    phone: "(51) 94321-0987",
  },
];

// Descriptive mock content
const vehicleDescriptions = [
  "Veículo impecável, conservado como novo, ideal para deslocamento urbano.",
  "Oportunidade única! Veículo em excelente estado, revisado e pronto para rodar.",
  "Perfeito para quem busca economia e praticidade no dia a dia.",
  "Veículo com histórico de manutenção em dia, documentação 100% regularizada.",
  "Ótimo para cidade e estrada, com performance e conforto garantidos.",
];

const electronicDescriptions = [
  "Dispositivo seminovo, funcionando perfeitamente, sem detalhes de uso visíveis.",
  "Tecnologia de ponta em estado impecável, acompanha todos os acessórios originais.",
  "Produto top de linha, atualizado e com garantia de procedência.",
  "Equipamento em excelente estado, ideal para quem busca qualidade sem pagar o preço de novo.",
  "Última geração, com todas as funcionalidades em perfeito estado de funcionamento.",
];

const clothingDescriptions = [
  "Peça autêntica, com caimento perfeito e tecido de alta qualidade.",
  "Roupa em estado impecável, lavada e passada, pronta para usar.",
  "Elegância e conforto em um único item, tamanho padrão brasileiro.",
  "Peça versátil que combina com diversos looks e ocasiões.",
  "Acabamento de primeira, sem defeitos ou marcas de uso.",
];

const homeDescriptions = [
  "Produto de alto padrão, perfeito para dar um toque especial na sua decoração.",
  "Eletrodoméstico em estado de novo, funcionando perfeitamente.",
  "Item essencial para sua casa, com design moderno e funcional.",
  "Conservado com muito cuidado, parece ter saído da loja.",
  "Solução prática e elegante para sua rotina doméstica.",
];

const foodDescriptions = [
  "Produto premium, sabor autenticamente brasileiro, origem certificada.",
  "Delícia gourmet para os mais exigentes paladares.",
  "Experiência gastronômica em primeira mão, seleção especial.",
  "Produto artesanal, preparado com ingredientes selecionados.",
  "Sabor tradicional, qualidade garantida, perfeito para momentos especiais.",
];

const gymDescriptions = [
  "Equipamento profissional, ideal para treinos intensos e resultados rápidos.",
  "Produto de alta performance, usado por pouquíssimo tempo.",
  "Essencial para quem leva a sério o condicionamento físico.",
  "Durabilidade e resistência comprovadas, acompanha garantia.",
  "Tecnologia e design para potencializar seus treinos.",
];

const medicineDescriptions = [
  "Produto farmacêutico original, em embalagem lacrada e dentro da validade.",
  "Medicamento de procedência comprovada, armazenado adequadamente.",
  "Solução completa para suas necessidades de saúde e bem-estar.",
  "Embalagem intacta, seguindo todos os protocolos de conservação.",
  "Qualidade e eficácia garantidas, procedência 100% confiável.",
];

const getDataAlgorithm = (id: number, data: any[]) => {
  const index = id % data.length;
  const firstNumber = Number(index.toString().charAt(0));

  if (firstNumber >= data.length) {
    return getDataAlgorithm(firstNumber, data);
  }

  return data[firstNumber];
};

// Helper function to generate mock products
const generateMockProducts = (
  titles: string[],
  category: Category,
  descriptions: string[],
  priceRanges: number[],
  images: string[]
) => {
  return titles.map(
    (title, index) =>
      ({
        id: id++,
        user: getDataAlgorithm(index, mockUsers),
        title,
        description: getDataAlgorithm(index, descriptions),
        price: getDataAlgorithm(index, priceRanges),
        images: [getDataAlgorithm(index, images)],
        category,
      } satisfies Product)
  );
};

export const mockProducts: Product[] = [
  // Vehicles (15+ products)
  ...generateMockProducts(
    [
      "Moto Honda CG 160",
      "Scooter Elétrica Xiaomi",
      "Bicicleta Caloi Mountain Bike",
      "Carro Fiat Uno 2012",
      "Carro Ford Ka 2015",
      "Carro Volkswagen Gol 2018",
      "Carro Chevrolet Onix 2020",
      "Carro Hyundai HB20 2021",
      "Moto Yamaha MT-09",
      "Bicicleta Elétrica",
      "Moto Honda CB 650R",
      "Carro Toyota Corolla",
      "Scooter Elétrica Segway",
      "Van Volkswagen Kombi",
      "Pickup Chevrolet S10",
    ],
    "vehicles",
    vehicleDescriptions,
    [5000, 10000, 15000, 20000, 25000],
    mock_veicules
  ),

  // Electronics (15+ products)
  ...generateMockProducts(
    [
      "Smartphone Samsung A54",
      "Notebook Dell Inspiron",
      'Smart TV LG 55"',
      "Console Playstation 5",
      "Console Xbox Series X",
      "Fone de Ouvido JBL",
      "Smartwatch Xiaomi",
      "Câmera Fotográfica Canon",
      "Console Nintendo Switch",
      "Tablet Samsung Galaxy Tab",
      "Monitor Gamer 144hz",
      "Caixa de Som JBL Flip 5",
      "Drone DJI Mavic",
      "Impressora Multifuncional Epson",
      "Kindle Paperwhite",
    ],
    "electronics",
    electronicDescriptions,
    [1500, 3500, 2500, 4000, 6000],
    mock_electronics
  ),

  // Clothing (15+ products)
  ...generateMockProducts(
    [
      "Tênis Nike Air Max",
      "Moletom Adidas Masculino",
      "Vestido Feminino Casual",
      "Jaqueta de Couro",
      "Calça Jeans Masculina",
      "Blusa Feminina Elegante",
      "Bermuda Masculina",
      "Vestido de Festa",
      "Camisa Social Masculina",
      "Tênis Esportivo Feminino",
      "Blazer Feminino",
      "Calça Legging",
      "Shorts Esportivo",
      "Casaco de Inverno",
      "Conjunto Esportivo",
    ],
    "clothing",
    clothingDescriptions,
    [100, 200, 150, 250, 300],
    mock_clothing_images
  ),

  // Home (15+ products)
  ...generateMockProducts(
    [
      "Sofá de 3 Lugares",
      "Máquina de Café Nespresso",
      "Aspirador Robô Xiaomi",
      "Panela de Pressão Elétrica",
      "Liquidificador Philips",
      "Ventilador de Torre",
      "Umidificador de Ar",
      "Purificador de Água",
      "Fritadeira Sem Óleo",
      "Conjunto de Panelas",
      "Ferro de Passar a Vapor",
      "Tapete Sala de Estar",
      "Luminária de Teto",
      "Ar-Condicionado Split",
      "Espelho Decorativo",
    ],
    "home",
    homeDescriptions,
    [500, 1000, 800, 1200, 1500],
    mock_clothing_images
  ),

  // Food (15+ products)
  ...generateMockProducts(
    [
      "Panetone Bauducco",
      "Café Torrado Brasileiro",
      "Cachaça Artesanal",
      "Mel Orgânico",
      "Chocolate Gourmet",
      "Azeite Extra Virgem",
      "Queijo Minas Artesanal",
      "Vinho Nacional",
      "Cachaça Premium",
      "Café Especial",
      "Doce de Leite Artesanal",
      "Biscoitos Gourmet",
      "Geleia Artesanal",
      "Rapadura Tradicional",
      "Guaraná Artesanal",
    ],
    "food",
    foodDescriptions,
    [30, 50, 70, 100, 150],
    mock_clothing_images
  ),

  // Gym (15+ products)
  ...generateMockProducts(
    [
      "Halter 10kg",
      "Barra Olímpica Profissional",
      "Suplemento Whey Protein",
      "Colchonete de Yoga",
      "Kettlebell",
      "Elástico de Resistência",
      "Luvas de Treino",
      "Garrafa de Água Esportiva",
      "Corda de Pular",
      "Máquina de Exercícios",
      "Bolsa de Treino",
      "Protetor Auricular",
      "Bandagem Elástica",
      "Suporte para Barra",
      "Powder Creatina",
    ],
    "gym",
    gymDescriptions,
    [100, 200, 150, 250, 300],
    mock_clothing_images
  ),

  // Medicine (15+ products)
  ...generateMockProducts(
    [
      "Dipirona 500mg",
      "Vitamina D 1000ui",
      "Termômetro Digital",
      "Máscara Cirúrgica",
      "Álcool em Gel",
      "Pomada Anti-inflamatória",
      "Xarope para Tosse",
      "Antisséptico Bucal",
      "Teste de Gravidez",
      "Luvas Descartáveis",
      "Atadura Elástica",
      "Aparelho de Pressão",
      "Soro Fisiológico",
      "Repelente de Insetos",
      "Vitamina C",
    ],
    "medicine",
    medicineDescriptions,
    [10, 20, 15, 30, 50],
    mock_clothing_images
  ),
];
