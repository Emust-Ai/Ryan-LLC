// n8n Tool Definitions for OpenAI Realtime API
// Tools for Ask Innovation Lead Collection Voice AI

import dotenv from 'dotenv';
dotenv.config();

export const N8N_BASE_URL = process.env.N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook';

console.log('N8N_BASE_URL configured as:', N8N_BASE_URL);

// Tool definitions following OpenAI function calling schema
export const TOOLS = [
  {
    type: 'function',
    name: 'hubspot_tool',
    description: 'Save or update lead information in HubSpot CRM. Call this IMMEDIATELY when the user provides any contact information such as email, phone number, name, company name, or job role. Do not wait to collect all information - save whatever is provided right away.',
    parameters: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'The email address of the lead'
        },
        phone: {
          type: 'string',
          description: 'The phone number of the lead'
        },
        name: {
          type: 'string',
          description: 'The full name of the lead (first and last name)'
        },
        company: {
          type: 'string',
          description: 'The company or organization the lead works for'
        },
        role: {
          type: 'string',
          description: 'The job title or role of the lead'
        },
        notes: {
          type: 'string',
          description: 'Any additional context about the lead, their pain points, or conversation highlights'
        },
        monthly_ticket_volume: {
          type: 'string',
          description: 'Approximate number of support tickets or calls they handle per month'
        },
        current_tools: {
          type: 'string',
          description: 'Current support tools or platforms they are using'
        }
      },
      required: ["email"]
    }
  },
  {
    type: 'function',
    name: 'priority_tool',
    description: 'Flag a lead as high priority and notify the sales team for immediate follow-up. Use when the user shows high intent such as asking for pricing details, requesting a demo, wanting to schedule a meeting, or expressing urgent need.',
    parameters: {
      type: 'object',
      properties: {
        reason: {
          type: 'string',
          description: 'The reason for flagging as high priority (e.g., "Requested demo", "Asked for pricing", "Wants to schedule meeting", "Urgent need for solution")'
        },
        lead_email: {
          type: 'string',
          description: 'The email of the lead if available'
        },
        lead_name: {
          type: 'string',
          description: 'The name of the lead if available'
        },
        company: {
          type: 'string',
          description: 'The company name if available'
        },
        urgency_level: {
          type: 'string',
          enum: ['high', 'medium'],
          description: 'The urgency level based on buyer signals'
        },
        call_sid: {
          type: 'string',
          description: 'The Twilio call SID for reference'
        },
        caller_number: {
          type: 'string',
          description: 'The phone number of the caller'
        }
      },
      required: ['reason']
    }
  },
  {
    type: 'function',
    name: 'status_tool',
    description: 'Update the conversation status and log the outcome. Use when the conversation has reached a natural conclusion, next steps are agreed upon, or the user wants to end the call.',
    parameters: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['qualified', 'meeting_booked', 'follow_up_needed', 'not_interested', 'information_only'],
          description: 'The outcome status of the conversation'
        },
        summary: {
          type: 'string',
          description: 'A brief summary of the conversation and any agreed next steps'
        },
        next_action: {
          type: 'string',
          description: 'The next action to take (e.g., "Send case study email", "Schedule demo call", "Follow up in 1 week")'
        },
        lead_email: {
          type: 'string',
          description: 'The email of the lead if available'
        },
        lead_name: {
          type: 'string',
          description: 'The name of the lead if available'
        }
      },
      required: ['status', 'summary']
    }
  },
  {
    type: 'function',
    name: 'save_user_info_tool',
    description: 'Save the caller\'s name and conversation context. Call this IMMEDIATELY when the user tells you their name for the first time during the call. This stores their identity so we can recognize them on future calls.',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The full name of the caller'
        },
        context: {
          type: 'string',
          description: 'Brief summary of what the caller needs or is discussing (e.g., "interested in chatbot automation for e-commerce")'
        }
      },
      required: ['name']
    }
  }
];

// Map tool names to their n8n webhook endpoints
export const TOOL_ENDPOINTS = {
  hubspot_tool: '/hubspot-lead',
  priority_tool: '/priority-lead',
  status_tool: '/conversation-status'
};
