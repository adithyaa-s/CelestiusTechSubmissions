'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { submitProject } from '../app/actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'

export function ProjectSubmissionForm() {
    const [role, setRole] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      setSubmitResult(null);
      const formData = new FormData(event.currentTarget);
      formData.append('role', role); // Explicitly add the role to the form data
      try {
        const result = await submitProject(formData);
        setSubmitResult(result.success 
          ? { success: true, message: 'Application submitted successfully!' }
          : { success: false, message: result.error || 'An error occurred' }
        );
      } catch (error) {
        console.error('Submission error:', error);
        setSubmitResult({ success: false, message: 'An unexpected error occurred' });
      } finally {
        setIsSubmitting(false);
      }
    }
  
   
  return (
    <Card className="w-full max-w-2xl bg-gray-800 text-gray-100 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-t-lg p-6 space-y-2">
        <CardTitle className="text-3xl font-bold text-center">Celestius - Tech Submission </CardTitle>
        <CardDescription className="text-gray-200 text-center">Elevate your Excellence</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
  <div className="space-y-4">
  <div>
    <Label htmlFor="role" className="text-gray-300 block mb-1">Your Role</Label>
    <Select onValueChange={setRole} required>
      <SelectTrigger className="bg-gray-700 text-gray-100 border-gray-600 focus:ring-violet-500">
        <SelectValue placeholder="Select your role" />
      </SelectTrigger>
      <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
        <SelectItem value="ai_dev">AI Developer</SelectItem>
        <SelectItem value="frontend_dev">Frontend Developer</SelectItem>
        <SelectItem value="backend_dev">Backend Developer</SelectItem>
        <SelectItem value="ui_ux_design">UI/UX Designer</SelectItem>
      </SelectContent>
    </Select>
  </div>
  <div>
    <Label htmlFor="name" className="text-gray-300 block mb-1">Full Name</Label>
    <Input id="name" name="name" required autoComplete="name" className="bg-gray-700 text-gray-100 border-gray-600 focus:ring-violet-500" />
  </div>
  <div>
    <Label htmlFor="admnNo" className="text-gray-300 block mb-1">Admission Number</Label>
    <Input id="admnNo" name="admnNo" required autoComplete="off" className="bg-gray-700 text-gray-100 border-gray-600 focus:ring-violet-500" />
  </div>
  <div>
    <Label htmlFor="email" className="text-gray-300 block mb-1">Email Address</Label>
    <Input id="email" name="email" type="email" required autoComplete="email" className="bg-gray-700 text-gray-100 border-gray-600 focus:ring-violet-500" />
  </div>
  <div>
    <Label htmlFor="phNo" className="text-gray-300 block mb-1">Phone Number</Label> <Input id="phNo" name="phNo" type="tel" required autoComplete="tel" className="bg-gray-700 text-gray-100 border-gray-600 focus:ring-violet-500" />
  </div>
  <div>
    <Label htmlFor="projectLink" className="text-gray-300 block mb-1">Project Repository (GitHub)</Label>
    <Input id="projectLink" name="projectLink" type="url" required autoComplete="url" className="bg-gray-700 text-gray-100 border-gray-600 focus:ring-violet-500" />
  </div>
</div>

{(role === 'ai_dev' || role === 'frontend_dev') && (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Label htmlFor="deployedLink" className="text-gray-300 block mb-1">Deployed Project URL</Label>
    <Input id="deployedLink" name="deployedLink" type="url" autoComplete="url" className="bg-gray-700 text-gray-100 border-gray-600 focus:ring-violet-500" />
  </motion.div>
)}

<Button 
  type="submit" 
  disabled={isSubmitting} 
  className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
>
  {isSubmitting ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Submitting...
    </>
  ) : (
    'Submit Project'
  )}
</Button>
</form>
      </CardContent>
    </Card>
  );

}