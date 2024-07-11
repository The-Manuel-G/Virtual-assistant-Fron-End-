
//app/history/page.tsx
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const users = await prisma.user.findMany({
    orderBy: {
      score: 'desc',
    },
    take: 3,
  });

  return {
    props: { users },
  };
}

export default function History({ users }) {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={6}>
        Top 3 Jugadores del Mes
      </Heading>
      <VStack spacing={4}>
        {users.map((user, index) => (
          <Box key={user.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Text fontSize="2xl">{`#${index + 1} ${user.name}`}</Text>
            <Text fontSize="lg">Puntaje: {user.score}</Text>
            <Text fontSize="md">Fecha de Registro: {new Date(user.createdAt).toLocaleDateString()}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
