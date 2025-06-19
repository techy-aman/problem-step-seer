
import { useState, useEffect } from 'react';
import { ProblemInput } from '@/components/ProblemInput';
import { StepByStepGuide } from '@/components/StepByStepGuide';
import { AnswerLimitTracker } from '@/components/AnswerLimitTracker';
import { Header } from '@/components/Header';
import { ProblemAnalysis } from '@/components/ProblemAnalysis';

interface Problem {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const Index = () => {
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [answerChecksLeft, setAnswerChecksLeft] = useState(4);
  const [lastResetDate, setLastResetDate] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Load from localStorage
    const savedChecks = localStorage.getItem('leetcode-helper-checks');
    const savedResetDate = localStorage.getItem('leetcode-helper-reset-date');
    
    if (savedChecks && savedResetDate) {
      const resetDate = new Date(savedResetDate);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - resetDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff >= 7) {
        // Reset weekly limit
        setAnswerChecksLeft(4);
        setLastResetDate(now.toISOString());
        localStorage.setItem('leetcode-helper-checks', '4');
        localStorage.setItem('leetcode-helper-reset-date', now.toISOString());
      } else {
        setAnswerChecksLeft(parseInt(savedChecks));
        setLastResetDate(savedResetDate);
      }
    } else {
      // First time user
      const now = new Date();
      setLastResetDate(now.toISOString());
      localStorage.setItem('leetcode-helper-checks', '4');
      localStorage.setItem('leetcode-helper-reset-date', now.toISOString());
    }
  }, []);

  const handleProblemSubmit = (problem: Problem) => {
    setCurrentProblem(problem);
    setCurrentStep(0);
    console.log('Problem submitted:', problem);
  };

  const useAnswerCheck = () => {
    if (answerChecksLeft > 0) {
      const newCount = answerChecksLeft - 1;
      setAnswerChecksLeft(newCount);
      localStorage.setItem('leetcode-helper-checks', newCount.toString());
      return true;
    }
    return false;
  };

  const getDaysUntilReset = () => {
    if (!lastResetDate) return 0;
    const resetDate = new Date(lastResetDate);
    const nextReset = new Date(resetDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const now = new Date();
    const daysLeft = Math.ceil((nextReset.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysLeft);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            LeetCode Learning Companion
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master problem-solving skills with step-by-step guidance. Learn the process, not just the answer.
          </p>
        </div>

        <AnswerLimitTracker 
          checksLeft={answerChecksLeft}
          daysUntilReset={getDaysUntilReset()}
        />

        {!currentProblem ? (
          <ProblemInput onProblemSubmit={handleProblemSubmit} />
        ) : (
          <div className="space-y-6">
            <ProblemAnalysis problem={currentProblem} />
            <StepByStepGuide 
              problem={currentProblem}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              answerChecksLeft={answerChecksLeft}
              onUseAnswerCheck={useAnswerCheck}
              onNewProblem={() => setCurrentProblem(null)}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
