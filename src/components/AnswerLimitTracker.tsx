
import { Shield, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface AnswerLimitTrackerProps {
  checksLeft: number;
  daysUntilReset: number;
}

export const AnswerLimitTracker = ({ checksLeft, daysUntilReset }: AnswerLimitTrackerProps) => {
  const getStatusColor = () => {
    if (checksLeft > 2) return 'text-green-600';
    if (checksLeft > 0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = () => {
    if (checksLeft > 2) return 'bg-green-500';
    if (checksLeft > 0) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="mb-6 border-2 border-dashed border-gray-200 bg-white/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className={`h-5 w-5 ${getStatusColor()}`} />
            <div>
              <h3 className="font-semibold text-gray-900">Answer Checks</h3>
              <p className="text-sm text-gray-600">
                {checksLeft > 0 
                  ? `${checksLeft} checks remaining this week`
                  : `No checks left - resets in ${daysUntilReset} days`
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`h-3 w-3 rounded-full ${
                    i < checksLeft ? getProgressColor() : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            
            {checksLeft === 0 && (
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{daysUntilReset}d left</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
