
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, 
  ChevronLeft, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle, 
  Eye,
  RotateCcw,
  MessageCircle
} from 'lucide-react';

interface Problem {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface StepByStepGuideProps {
  problem: Problem;
  currentStep: number;
  onStepChange: (step: number) => void;
  answerChecksLeft: number;
  onUseAnswerCheck: () => boolean;
  onNewProblem: () => void;
}

interface Step {
  id: number;
  title: string;
  content: string;
  hint: string;
  type: 'understand' | 'analyze' | 'plan' | 'implement' | 'test' | 'optimize';
  questions: string[];
}

export const StepByStepGuide = ({ 
  problem, 
  currentStep, 
  onStepChange, 
  answerChecksLeft,
  onUseAnswerCheck,
  onNewProblem 
}: StepByStepGuideProps) => {
  const [showHint, setShowHint] = useState(false);
  const [askedForAnswer, setAskedForAnswer] = useState(false);
  const [userInput, setUserInput] = useState('');

  // Generate steps based on the problem (simplified for demo)
  const generateSteps = (problem: Problem): Step[] => {
    return [
      {
        id: 1,
        title: "🔍 Understand the Problem",
        content: "Let's break down what this problem is asking for. Read carefully and identify the key components.",
        hint: "Focus on: What are the inputs? What should the output be? Are there any constraints mentioned?",
        type: 'understand',
        questions: [
          "What are the input parameters?",
          "What should your function return?",
          "Are there any edge cases to consider?",
          "What are the constraints (array size, value ranges)?"
        ]
      },
      {
        id: 2,
        title: "🎯 Analyze Examples",
        content: "Think through some examples to understand the pattern. This helps clarify the problem requirements.",
        hint: "Try working through 2-3 examples manually. What steps do you naturally take?",
        type: 'analyze',
        questions: [
          "Can you solve a simple example by hand?",
          "What pattern do you notice in your manual solution?",
          "How would you explain your thought process?",
          "Are there different ways to approach this?"
        ]
      },
      {
        id: 3,
        title: "🗺️ Plan Your Approach",
        content: "Now let's think about the algorithm. What data structures or techniques might be useful?",
        hint: "Consider: Do you need to store information? Is there a mathematical relationship? Can you use sorting or searching?",
        type: 'plan',
        questions: [
          "What data structure would be most helpful?",
          "Is this a brute force or optimized approach?",
          "What's the time complexity of your approach?",
          "Can you outline the main steps of your algorithm?"
        ]
      },
      {
        id: 4,
        title: "⚡ Consider Edge Cases",
        content: "What could go wrong? Think about boundary conditions and special cases.",
        hint: "Empty inputs, single elements, duplicates, negative numbers - what applies here?",
        type: 'implement',
        questions: [
          "What happens with empty input?",
          "How do you handle single element cases?",
          "Are there any invalid inputs to check for?",
          "What about duplicate values?"
        ]
      },
      {
        id: 5,
        title: "🔧 Implementation Strategy",
        content: "Time to think about the actual code structure. What functions or loops will you need?",
        hint: "Break it down: initialization, main logic loop, return statement. Keep it simple first.",
        type: 'implement',
        questions: [
          "What variables need to be initialized?",
          "Do you need nested loops or just one?",
          "When do you know you've found the answer?",
          "How will you structure your return statement?"
        ]
      },
      {
        id: 6,
        title: "✅ Test Your Logic",
        content: "Before coding, let's verify your approach works with the examples.",
        hint: "Walk through your algorithm step-by-step with the given examples. Does it produce the right output?",
        type: 'test',
        questions: [
          "Does your approach work for all given examples?",
          "Have you tested edge cases?",
          "Is your logic clear and easy to follow?",
          "Are there any obvious optimizations?"
        ]
      }
    ];
  };

  const steps = generateSteps(problem);
  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleAnswerRequest = () => {
    if (answerChecksLeft > 0) {
      const success = onUseAnswerCheck();
      if (success) {
        setAskedForAnswer(true);
        // In a real app, you'd show the actual solution here
        console.log('Answer check used - showing solution');
      }
    }
  };

  const getStepIcon = (type: string) => {
    const iconClass = "h-5 w-5";
    switch (type) {
      case 'understand': return <MessageCircle className={iconClass} />;
      case 'analyze': return <Lightbulb className={iconClass} />;
      case 'plan': return <CheckCircle className={iconClass} />;
      case 'implement': return <ChevronRight className={iconClass} />;
      case 'test': return <Eye className={iconClass} />;
      default: return <ChevronRight className={iconClass} />;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case 'understand': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'analyze': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'plan': return 'bg-green-50 border-green-200 text-green-700';
      case 'implement': return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'test': return 'bg-indigo-50 border-indigo-200 text-indigo-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="bg-white/70 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Learning Progress</h2>
            <Badge variant="outline">
              Step {currentStep + 1} of {steps.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600 mt-2">
            {Math.round(progress)}% complete
          </p>
        </CardContent>
      </Card>

      {/* Current Step */}
      <Card className="bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg border ${getStepColor(currentStepData.type)}`}>
              {getStepIcon(currentStepData.type)}
            </div>
            <span>{currentStepData.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            {currentStepData.content}
          </p>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center space-x-2">
              <Lightbulb className="h-4 w-4" />
              <span>Guiding Questions</span>
            </h4>
            <ul className="space-y-2">
              {currentStepData.questions.map((question, index) => (
                <li key={index} className="text-blue-800 text-sm flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-3">
            <Button
              onClick={() => setShowHint(!showHint)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Lightbulb className="h-4 w-4" />
              <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
            </Button>

            {showHint && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-yellow-800">{currentStepData.hint}</p>
              </div>
            )}
          </div>

          {/* Answer Request Section */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-red-900 mb-2">Want to see the answer?</h4>
                {askedForAnswer ? (
                  <div className="text-red-800">
                    <p className="mb-2">🚫 I won't show you the direct answer - that won't help you learn!</p>
                    <p className="text-sm">Instead, work through the guiding questions above. The learning happens in the process, not in seeing the solution.</p>
                  </div>
                ) : answerChecksLeft > 0 ? (
                  <div>
                    <p className="text-red-800 text-sm mb-3">
                      You have {answerChecksLeft} answer checks left this week. But remember - seeing the answer won't help you learn the problem-solving process!
                    </p>
                    <Button
                      onClick={handleAnswerRequest}
                      variant="destructive"
                      size="sm"
                    >
                      Use Answer Check ({answerChecksLeft} left)
                    </Button>
                  </div>
                ) : (
                  <p className="text-red-800 text-sm">
                    No answer checks remaining this week. Focus on understanding the process instead!
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => onStepChange(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous Step</span>
        </Button>

        <div className="flex space-x-2">
          <Button
            onClick={onNewProblem}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>New Problem</span>
          </Button>

          <Button
            onClick={() => onStepChange(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="flex items-center space-x-2"
          >
            <span>Next Step</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
