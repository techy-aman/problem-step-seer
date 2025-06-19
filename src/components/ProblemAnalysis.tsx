
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Clock, Zap } from 'lucide-react';

interface Problem {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface ProblemAnalysisProps {
  problem: Problem;
}

export const ProblemAnalysis = ({ problem }: ProblemAnalysisProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Simple pattern recognition for demo purposes
  const analyzePatterns = (description: string) => {
    const patterns = [];
    if (description.toLowerCase().includes('array') || description.toLowerCase().includes('nums')) {
      patterns.push('Array Manipulation');
    }
    if (description.toLowerCase().includes('two') && description.toLowerCase().includes('sum')) {
      patterns.push('Two Pointer');
    }
    if (description.toLowerCase().includes('hash') || description.toLowerCase().includes('map')) {
      patterns.push('Hash Table');
    } else if (description.toLowerCase().includes('target')) {
      patterns.push('Hash Table');
    }
    if (description.toLowerCase().includes('sort')) {
      patterns.push('Sorting');
    }
    if (description.toLowerCase().includes('tree') || description.toLowerCase().includes('node')) {
      patterns.push('Tree Traversal');
    }
    
    return patterns.length > 0 ? patterns : ['Pattern Analysis'];
  };

  const getTimeComplexityHint = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'O(n) or O(n log n)';
      case 'Medium': return 'O(n) to O(n²)';
      case 'Hard': return 'O(n log n) to O(n²)';
      default: return 'Variable';
    }
  };

  const patterns = analyzePatterns(problem.description);

  return (
    <Card className="bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl mb-2">{problem.title}</CardTitle>
            <Badge className={getDifficultyColor(problem.difficulty)}>
              {problem.difficulty}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Problem Description</h4>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">
            {problem.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <Target className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-blue-900">Likely Patterns</h5>
              <div className="space-y-1 mt-1">
                {patterns.map((pattern, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {pattern}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
            <Clock className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-purple-900">Time Target</h5>
              <p className="text-sm text-purple-700 mt-1">
                {getTimeComplexityHint(problem.difficulty)}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
            <Zap className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-green-900">Approach</h5>
              <p className="text-sm text-green-700 mt-1">
                Think step by step
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
