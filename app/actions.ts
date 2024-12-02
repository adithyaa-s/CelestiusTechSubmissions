'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function submitProject(formData: FormData) {
  try {
    const role = formData.get('role') as string
    const name = formData.get('name') as string
    const admnNo = formData.get('admnNo') as string
    const email = formData.get('email') as string
    const phNo = formData.get('phNo') as string
    const projectLink = formData.get('projectLink') as string
    const deployedLink = formData.get('deployedLink') as string | null

    if (!role) {
      return { success: false, error: 'Role is required' }
    }

    let tableName: string

    switch (role) {
      case 'ai_dev':
        tableName = 'ai_dev_projects'
        break
      case 'frontend_dev':
        tableName = 'frontend_dev_projects'
        break
      case 'backend_dev':
        tableName = 'backend_dev_projects'
        break
      case 'ui_ux_design':
        tableName = 'ui_ux_design_projects'
        break
      default:
        return { success: false, error: 'Invalid role selected' }
    }

    // Map the form data to match the database column names
    const data = {
      name,
      admn_no: admnNo, // Changed to match the database column name
      email,
      ph_no: phNo, // Changed to match the database column name
      project_link: projectLink, // Changed to match the database column name
      ...(deployedLink && { deployed_link: deployedLink }) // Changed to match the database column name
    }

    const { error } = await supabase
      .from(tableName)
      .insert([data])

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Supabase error:', error)
    return { 
      success: false, 
      error: 'An error occurred while submitting the project. Please try again.' 
    }
  }
}

