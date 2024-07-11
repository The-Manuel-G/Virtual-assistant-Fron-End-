//src/components/game/Question.tsx

import { Box, Button, VStack, Heading } from '@chakra-ui/react';

type QuestionProps = {
  question: {
    question: string;
    options: string[];
    answer: string;
  } | undefined;
  onAnswerOptionClick: (isCorrect: boolean) => void;
  feedback: string;
};

export default function Question({ question, onAnswerOptionClick, feedback }: QuestionProps) {
  if (!question) {
    return null; // o un componente de carga o mensaje adecuado
  }

  return (
    <Box>
      <Heading as="h3" size="md" mb={6}>{question.question}</Heading>
      <VStack spacing={3}>
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onAnswerOptionClick(option === question.answer)}
            className={`w-full py-2 rounded-md ${feedback === 'correcto' && option === question.answer ? 'bg-green-500' : feedback === 'incorrecto' && option === question.answer ? 'bg-red-500' : 'bg-teal-500'} text-white`}
            disabled={feedback !== ''}
          >
            {option}
          </Button>
        ))}
      </VStack>
    </Box>
  );
}
