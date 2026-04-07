// Ask Innovation - AI Customer Support Solutions
// Company information and product details for the voice AI lead collector

export const APP_GUIDE_SECTIONS = {
  
  company_overview: `Ask Innovation is a leading provider of AI-powered customer support solutions. We help businesses automate their support workflows, reduce response times, and improve customer satisfaction. Our solutions include AI voice agents, chatbots, and intelligent ticket routing systems.`,

  ai_voice_agents: `AI Voice Agents by Ask Innovation:
- 24/7 automated phone support
- Natural language understanding
- Multi-language support
- Seamless human handoff when needed
- Integration with existing phone systems
- Real-time analytics and reporting
Our voice agents handle common inquiries, reducing wait times and freeing up human agents for complex issues.`,

  ai_chatbots: `AI Chatbots by Ask Innovation:
- Website and app integration
- Omnichannel support (WhatsApp, Messenger, etc.)
- Intelligent conversation routing
- Personalized responses based on customer history
- Easy no-code configuration
- Works with your existing CRM
Chatbots can handle up to 70% of routine customer inquiries automatically.`,

  ticket_routing: `Intelligent Ticket Routing:
- AI-powered ticket classification
- Automatic priority assignment
- Smart agent matching based on skills
- Workload balancing
- SLA management
- Escalation automation
Reduce response times by 40% with intelligent routing.`,

  integrations: `Integrations we support:
- CRM: Salesforce, HubSpot, Zoho
- Helpdesk: Zendesk, Freshdesk, Intercom
- Communication: Twilio, WhatsApp Business, Slack
- E-commerce: Shopify, WooCommerce, Magento
- Custom integrations via REST API
We integrate seamlessly with your existing tech stack.`,

  case_studies: `Success Stories:
- E-commerce client: Reduced support costs by 45% while improving CSAT by 20%
- SaaS company: Decreased first response time from 4 hours to 2 minutes
- Telecom provider: Automated 65% of incoming calls with 90% resolution rate
- Retail chain: Handled 3x more inquiries during peak season without adding staff
We have proven results across multiple industries.`,

  common_use_cases: `Common support challenges we solve:
- High ticket volume overwhelming your team
- Long wait times frustrating customers
- Repetitive questions taking up agent time
- Inconsistent support quality across channels
- Difficulty scaling support during peak periods
- Limited after-hours support coverage
Our AI solutions address all these pain points.`,

  implementation: `Implementation Process:
1. Discovery call to understand your needs
2. Custom solution design
3. Integration with your systems
4. Training and knowledge base setup
5. Testing and optimization
6. Go-live with ongoing support
Typical implementation takes 2-4 weeks depending on complexity.`,

  pricing_overview: `Pricing Overview:
- We offer flexible pricing based on your needs
- Volume-based pricing for conversations/tickets
- Custom enterprise pricing available
- Free pilot program for qualified businesses
- No long-term contracts required to start
Contact us for a personalized quote based on your ticket volume and requirements.`
};

// Keep backward compatibility
export const APP_GUIDE = Object.values(APP_GUIDE_SECTIONS).join('\n\n---\n\n');

export default APP_GUIDE_SECTIONS;
