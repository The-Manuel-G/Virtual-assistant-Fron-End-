//app/dashboard/page.tsx
import { useState, useEffect } from 'react';
import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function getServerSideProps() {
  const users = await prisma.user.findMany({
    select: {
      createdAt: true,
    },
  });

  const dailyRegistrations = users.reduce((acc, user) => {
    const date = new Date(user.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  return {
    props: { dailyRegistrations },
  };
}

export default function Dashboard({ dailyRegistrations }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const dates = Object.keys(dailyRegistrations);
    const counts = Object.values(dailyRegistrations);

    setChartData({
      labels: dates,
      datasets: [
        {
          label: 'Nuevos usuarios por día',
          data: counts,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    });
  }, [dailyRegistrations]);

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={6}>
        Dashboard de Administración
      </Heading>
      <VStack spacing={4}>
        <Text fontSize="lg">Nuevos usuarios registrados por día:</Text>
        <Line data={chartData} />
      </VStack>
    </Box>
  );
}
