// Mock tickets for demo user (userId: "1")
export const mockTickets: Ticket[] = [
  {
    id: "1",
    title: "Setup Development Environment",
    description: "Need help setting up local development environment",
    status: "open",
    createdAt: "2025-10-23T10:00:00Z",
    updatedAt: "2025-10-23T10:00:00Z",
    userId: "demo-user",
  },
  {
    id: "2",
    title: "Database Connection Issue",
    description: "Unable to connect to production database",
    status: "in-progress",
    createdAt: "2025-10-22T15:30:00Z",
    updatedAt: "2025-10-23T09:15:00Z",
    userId: "demo-user",
  },
  {
    id: "3",
    title: "Update Documentation",
    description: "API documentation needs to be updated",
    status: "closed",
    createdAt: "2025-10-21T08:00:00Z",
    updatedAt: "2025-10-22T16:45:00Z",
    userId: "demo-user",
  },
];

// Helper to initialize mock tickets in localStorage for demo user
export function initializeMockTickets() {
  const session = localStorage.getItem("ticketapp_session");
  let currentData;
  try {
    currentData = session ? JSON.parse(session) : { tickets: [] };
  } catch {
    currentData = { tickets: [] };
  }
  // Only add if no tickets for demo user
  const hasDemoTickets =
    currentData.tickets &&
    currentData.tickets.some((t: Ticket) => t.userId === "1");
  if (!hasDemoTickets) {
    currentData.tickets = [...(currentData.tickets || []), ...mockTickets];
    localStorage.setItem("ticketapp_session", JSON.stringify(currentData));
  }
}
export type TicketStatus = "open" | "in-progress" | "closed";
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateTicketData = {
  title: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  userId: string;
};

export type UpdateTicketData = Partial<CreateTicketData>;

export interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
}

export const ticketService = {
  async getTickets(userId: string): Promise<Ticket[]> {
    // For demo, get tickets from localStorage
    const session = localStorage.getItem("ticketapp_session");
    if (!session) return [];

    try {
      const { tickets = [] } = JSON.parse(session);
      return tickets.filter((ticket: Ticket) => ticket.userId === userId);
    } catch {
      return [];
    }
  },

  async getTicketStats(userId: string): Promise<TicketStats> {
    const tickets = await this.getTickets(userId);

    return tickets.reduce(
      (stats, ticket) => {
        stats.total++;

        if (ticket.status === "open") {
          stats.open++;
        } else if (ticket.status === "in-progress") {
          stats.inProgress++;
        } else if (ticket.status === "closed") {
          stats.closed++;
        }

        return stats;
      },
      {
        total: 0,
        open: 0,
        inProgress: 0,
        closed: 0,
      }
    );
  },

  async createTicket(
    data: Omit<Ticket, "id" | "createdAt" | "updatedAt">
  ): Promise<Ticket> {
    const session = localStorage.getItem("ticketapp_session");
    let currentData;
    try {
      currentData = session ? JSON.parse(session) : { tickets: [] };
    } catch {
      currentData = { tickets: [] };
    }
    if (!Array.isArray(currentData.tickets)) {
      currentData.tickets = [];
    }

    const newTicket: Ticket = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    currentData.tickets = [...currentData.tickets, newTicket];
    localStorage.setItem("ticketapp_session", JSON.stringify(currentData));

    return newTicket;
  },

  async updateTicket(id: string, data: Partial<Ticket>): Promise<Ticket> {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) throw new Error("Ticket not found");

    const currentData = JSON.parse(session);
    const ticketIndex = currentData.tickets.findIndex(
      (t: Ticket) => t.id === id
    );

    if (ticketIndex === -1) throw new Error("Ticket not found");

    const updatedTicket = {
      ...currentData.tickets[ticketIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    currentData.tickets[ticketIndex] = updatedTicket;
    localStorage.setItem("ticketapp_session", JSON.stringify(currentData));

    return updatedTicket;
  },

  async deleteTicket(id: string, userId: string): Promise<void> {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) throw new Error("Ticket not found");

    const currentData = JSON.parse(session);
    const ticketIndex = currentData.tickets.findIndex(
      (t: Ticket) => t.id === id && t.userId === userId
    );

    if (ticketIndex === -1) throw new Error("Ticket not found");

    currentData.tickets.splice(ticketIndex, 1);
    localStorage.setItem("ticketapp_session", JSON.stringify(currentData));
  },
};
