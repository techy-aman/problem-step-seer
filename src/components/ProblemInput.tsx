
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Upload, Link as LinkIcon } from 'lucide-react';

interface Problem {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface ProblemInputProps {
  onProblemSubmit: (problem: Problem) => void;
}

export const ProblemInput = ({ onProblemSubmit }: ProblemInputProps) => {
  const [inputMethod, setInputMethod] = useState<'manual' | 'url'>('manual');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputMethod === 'manual' && title && description) {
      onProblemSubmit({
        title: title.trim(),
        description: description.trim(),
        difficulty
      });
    } else if (inputMethod === 'url' && url) {
      // For demo purposes, we'll extract a mock problem from URL
      // In a real app, you'd parse the LeetCode URL
      const mockProblem = {
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        difficulty: 'Easy' as const
      };
      onProblemSubmit(mockProblem);
    }
  };

  const sampleProblems = [
    {
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      difficulty: 'Easy' as const
    },
    {
      title: "Add Two Numbers",
      description: "You are given two non-empty linked lists representing two non-negative integers stored in reverse order.",
      difficulty: 'Medium' as const
    },
    {
      title: "Median of Two Sorted Arrays",
      description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two arrays.",
      difficulty: 'Hard' as const
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Add a LeetCode Problem</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4 mb-4">
            <Button
              type="button"
              variant={inputMethod === 'manual' ? 'default' : 'outline'}
              onClick={() => setInputMethod('manual')}
              className="flex-1"
            >
              Manual Input
            </Button>
            <Button
              type="button"
              variant={inputMethod === 'url' ? 'default' : 'outline'}
              onClick={() => setInputMethod('url')}
              className="flex-1"
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              From URL
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {inputMethod === 'manual' ? (
              <>
                <div>
                  <Label htmlFor="title">Problem Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Two Sum"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Problem Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Paste the complete problem description here..."
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={difficulty} onValueChange={(value: 'Easy' | 'Medium' | 'Hard') => setDifficulty(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <div>
                <Label htmlFor="url">LeetCode Problem URL</Label>
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://leetcode.com/problems/two-sum/"
                  type="url"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Paste any LeetCode problem URL and we'll extract the details for you
                </p>
              </div>
            )}

            <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              Start Learning This Problem
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Try Sample Problems</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {sampleProblems.map((problem, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto p-4 text-left"
                onClick={() => onProblemSubmit(problem)}
              >
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">{problem.title}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {problem.description.substring(0, 100)}...
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
