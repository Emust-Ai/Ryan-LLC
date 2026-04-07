import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.join(__dirname, '../../data/users.json');

// Ensure the data directory and file exist
function ensureFile() {
  const dir = path.dirname(USERS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, '{}', 'utf-8');
  }
}

// Read all users from the JSON file
function readUsers() {
  ensureFile();
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return {};
  }
}

// Write all users to the JSON file
function writeUsers(users) {
  ensureFile();
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing users file:', error);
  }
}

/**
 * Look up a user by phone number.
 * Returns the user object if found, or null if not.
 */
export function lookupUser(phoneNumber) {
  if (!phoneNumber) return null;
  const users = readUsers();
  return users[phoneNumber] || null;
}

/**
 * Save or update a user's name for a given phone number.
 */
export function saveUserName(phoneNumber, name) {
  if (!phoneNumber || !name) return;
  const users = readUsers();
  if (!users[phoneNumber]) {
    users[phoneNumber] = {
      name: name,
      firstContact: new Date().toISOString(),
      lastContact: new Date().toISOString(),
      conversations: []
    };
  } else {
    users[phoneNumber].name = name;
    users[phoneNumber].lastContact = new Date().toISOString();
  }
  writeUsers(users);
  console.log(`✅ User saved: ${phoneNumber} → ${name}`);
}

/**
 * Save a conversation summary for a user after the call ends.
 * This becomes the "context" for next time they call.
 */
export function saveConversationContext(phoneNumber, summary, topics = []) {
  if (!phoneNumber) return;
  const users = readUsers();
  if (!users[phoneNumber]) {
    users[phoneNumber] = {
      name: null,
      firstContact: new Date().toISOString(),
      lastContact: new Date().toISOString(),
      conversations: []
    };
  }
  users[phoneNumber].lastContact = new Date().toISOString();
  users[phoneNumber].conversations.push({
    date: new Date().toISOString(),
    summary: summary,
    topics: topics
  });
  // Keep only the last 10 conversations
  if (users[phoneNumber].conversations.length > 10) {
    users[phoneNumber].conversations = users[phoneNumber].conversations.slice(-10);
  }
  writeUsers(users);
  console.log(`✅ Conversation context saved for ${phoneNumber}`);
}

/**
 * Get the user's name for a given phone number (or null).
 */
export function getUserName(phoneNumber) {
  const user = lookupUser(phoneNumber);
  return user?.name || null;
}

/**
 * Build a context string for the AI based on the user's history.
 * Returns null if the user is unknown.
 */
export function buildUserContextPrompt(phoneNumber) {
  const user = lookupUser(phoneNumber);
  if (!user || !user.name) return null;

  let contextParts = [];
  contextParts.push(`The caller's name is "${user.name}".`);
  contextParts.push(`They have called before (first contact: ${user.firstContact}).`);

  if (user.conversations && user.conversations.length > 0) {
    const lastConversation = user.conversations[user.conversations.length - 1];
    contextParts.push(`Their last conversation was on ${lastConversation.date}.`);
    if (lastConversation.summary) {
      contextParts.push(`Summary of last conversation: ${lastConversation.summary}`);
    }
    if (lastConversation.topics && lastConversation.topics.length > 0) {
      contextParts.push(`Topics discussed: ${lastConversation.topics.join(', ')}`);
    }
  }

  return contextParts.join('\n');
}

export default {
  lookupUser,
  saveUserName,
  saveConversationContext,
  getUserName,
  buildUserContextPrompt
};
