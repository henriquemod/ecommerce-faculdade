import { Product } from "../types/product";
import { User } from "../types/user";

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
];

const getDataAlgorithm = (id: number, data: any[]) => {
  const index = id % data.length;
  const firstNumber = Number(index.toString().charAt(0));

  if (firstNumber >= data.length) {
    return getDataAlgorithm(firstNumber, data);
  }

  return data[firstNumber];
};

export const mockProducts: Product[] = [
  // Vehicles
  ...[
    "Moto Honda CG 160",
    "Scooter Elétrica Xiaomi",
    "Bicicleta Caloi Mountain Bike",
    "Carro Fiat Uno 2012",
    "Carro Ford Ka 2015",
    "Carro Volkswagen Gol 2018",
    "Carro Chevrolet Onix 2020",
    "Carro Hyundai HB20 2021",
    "Moto Honda CG 160",
    "Scooter El",
  ].map(
    (title, index) =>
      ({
        id: id++,
        user: getDataAlgorithm(index, mockUsers),
        title,
        description:
          "Ótimo veículo para deslocamento urbano, em excelente estado.",
        price: getDataAlgorithm(index, [5000, 10000, 15000]),
        images: [getDataAlgorithm(index, mock_veicules)],
        category: "vehicles",
      } satisfies Product)
  ),

  // Electronics
  ...[
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
  ].map(
    (title, index) =>
      ({
        id: id++,
        user: getDataAlgorithm(index, mockUsers),
        title,
        description:
          "Produto seminovo, funciona perfeitamente, sem detalhes de uso.",
        price: getDataAlgorithm(index, [1500, 3500, 2500]),
        images: [getDataAlgorithm(index, mock_electronics)],
        category: "electronics",
      } satisfies Product)
  ),

  // Clothing
  ...[
    "Tênis Nike Air Max",
    "Moletom Adidas Masculino",
    "Vestido Feminino Casual",
  ].map(
    (title, index) =>
      ({
        id: id++,
        user: getDataAlgorithm(index, mockUsers),
        title,
        description: "Roupa em ótimo estado, tamanho padrão brasileiro.",
        price: getDataAlgorithm(index, [200, 150, 100]),
        images: [""],
        category: "clothing",
      } satisfies Product)
  ),

  // Home
  ...[
    "Sofá de 3 Lugares",
    "Máquina de Café Nespresso",
    "Aspirador Robô Xiaomi",
  ].map(
    (title, index) =>
      ({
        id: id++,
        user: getDataAlgorithm(index, mockUsers),
        title,
        description:
          "Produto para sua casa, em perfeito estado de conservação.",
        price: getDataAlgorithm(index, [1000, 500, 800]),
        images: [""],
        category: "home",
      } satisfies Product)
  ),

  // Food
  ...["Panetone Bauducco", "Café Torrado Brasileiro", "Cachaça Artesanal"].map(
    (title, index) =>
      ({
        id: id++,
        user: getDataAlgorithm(index, mockUsers),
        title,
        description: "Produto premium, sabor autenticamente brasileiro.",
        price: getDataAlgorithm(index, [50, 30, 70]),
        images: [""],
        category: "food",
      } satisfies Product)
  ),

  // Gym
  ...[
    "Halter 10kg",
    "Barra Olímpica Profissional",
    "Suplemento Whey Protein",
  ].map(
    (title, index) =>
      ({
        id: id++,
        user: getDataAlgorithm(index, mockUsers),
        title,
        description: "Equipamento de academia de alta qualidade para treino.",
        price: getDataAlgorithm(index, [100, 200, 150]),
        images: [""],
        category: "gym",
      } satisfies Product)
  ),

  // Medicine
  ...["Dipirona 500mg", "Vitamina D 1000ui", "Termômetro Digital"].map(
    (title, index) =>
      ({
        id: id++,
        user: getDataAlgorithm(index, mockUsers),
        title,
        description:
          "Produto farmacêutico em embalagem original, dentro da validade.",
        price: getDataAlgorithm(index, [10, 20, 15]),
        images: [""],
        category: "medicine",
      } satisfies Product)
  ),
];
