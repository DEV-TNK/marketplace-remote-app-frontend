import { createContext } from 'react';
import { settings } from '../AppConfig';

// Define your context with default values
export const AppConfigContext = createContext({
    ...settings, // Spread the settings object to include all its properties
    setAppConfig: () => {} // Define setAppConfig with a default function
});
export const MailContext = createContext({ mails: [] });
export const ChatContext = createContext();
export const TaskKanbanContext = createContext({
	taskColumns: [],
	tasks: []
});
export const CartContext = createContext();
