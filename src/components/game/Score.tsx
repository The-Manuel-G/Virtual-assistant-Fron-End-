"use client";  // Añadir esta línea

import { Box, Button, Heading, Text, VStack, HStack, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

const getRewardMessage = (score, total) => {
  const percentage = (score / total) * 100;
  if (percentage === 100) return '¡Excelente! ¡Eres un genio financiero!';
  if (percentage >= 80) return '¡Muy bien! Tienes buen conocimiento financiero.';
  if (percentage >= 50) return '¡Bien hecho! Puedes mejorar aún más.';
  return '¡Sigue practicando! La educación financiera es clave.';
};

export default function Score({ score, total }) {
  const stars = Array(total).fill(0).map((_, i) => (
    <Icon key={i} as={FaStar} className={i < score ? 'text-yellow-400' : 'text-gray-300'} />
  ));

  return (
    <Box className="text-center py-10">
      <Heading as="h2" size="xl" mb={6} className="text-purple-500">
        Puntaje Final
      </Heading>
      <Text fontSize="2xl" mb={6}>
        {`Puntaje: ${score} de ${total}`}
      </Text>
      <HStack justifyContent="center" mb={6}>
        {stars}
      </HStack>
      <Text fontSize="xl" mb={6}>
        {getRewardMessage(score, total)}
      </Text>
      <Link href="/" passHref>
        <Button as="a" colorScheme="teal" size="lg" className="bg-teal-500 hover:bg-teal-700 text-white rounded-md">
          Volver al Inicio
        </Button>
      </Link>
    </Box>
  );
}
