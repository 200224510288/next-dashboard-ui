"use server";

import { revalidatePath } from "next/cache";
import { AgentSchema } from "./formValidationSchemas";
import prisma from "./prisma";
import { error } from "console";
import { boolean } from "zod";

type CurrentState = { success: boolean; error: boolean };

export const createAgent = async (currentState: CurrentState, data: AgentSchema) => {
  try {
    // Check if the user already exists by email
    const user = await prisma.user.findUnique({
      where: {
        Email: data.email,
      },
    });

    if (!user) {
      // Create a new user if not found
      const newUser = await prisma.user.create({
        data: {
          Email: data.email,
          UserName: data.userName,
          Password: data.password ?? "",
        },
      });

      // Create the agent and add contact numbers
      const newAgent = await prisma.agent.create({
        data: {
          FirstName: data.firstName,
          LastName: data.lastName,
          OfficeAddress: data.officeAddress,
          HomeAddress: data.homeAddress,
          City: data.city,
          User: {
            connect: { UserID: newUser.UserID },
          },
          Agent_Contact_Number: {
            create: [
              { ContactNumber: data.ContactNumber1 },
              { ContactNumber: data.ContactNumber2 ?? "" },
            ],
          },
        },
      });
    } else {
      // If user exists, just create the agent and link contact numbers
      await prisma.agent.create({
        data: {
          FirstName: data.firstName,
          LastName: data.lastName,
          OfficeAddress: data.officeAddress,
          HomeAddress: data.homeAddress,
          City: data.city,
          User: {
            connect: { UserID: user.UserID },
          },
          Agent_Contact_Number: {
            create: [
              { ContactNumber: data.ContactNumber1 },
              { ContactNumber: data.ContactNumber2 ?? "" },
            ],
          },
        },
      });
    }

   // revalidatePath("/list/agents");
    return { success: true, error: false };
  } catch (err) {
    console.error("Create Agent Error:", err);
    return { success: false, error: true };
  }
};

export const updateAgent = async (currentState: CurrentState, data: AgentSchema) => {
  try {
    // Update the agent and contact numbers
    const updatedAgent = await prisma.agent.update({
      where: {
        AgentID: data.id,
      },
      data: {
        FirstName: data.firstName,
        LastName: data.lastName,
        OfficeAddress: data.officeAddress,
        HomeAddress: data.homeAddress,
        City: data.city,
        User: {
          update: {
            Email: data.email,
            UserName: data.userName,
            Password: data.password ?? "",
          },
        },
        Agent_Contact_Number: {
          deleteMany: {}, // Clear existing contact numbers
          create: [
            { ContactNumber: data.ContactNumber1 },
            { ContactNumber: data.ContactNumber2 ?? "" },
          ],
        },
      },
      include: { User: true, Agent_Contact_Number: true },
    });

   // revalidatePath("/list/agents");
    return { success: true, error: false, updatedAgent };
  } catch (err) {
    console.error("Update Agent Error:", err);
    return { success: false, error: true };
  }
};

export const deleteAgent = async (currentState: CurrentState, data: FormData) => {
  const id = data.get("id") as string;

  try {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return { success: false, error: true };
    }

    await prisma.$transaction([
      prisma.agent_Contact_Number.deleteMany({
        where: { AgentID: parsedId },
      }),
      prisma.agent.delete({
        where: { AgentID: parsedId },
      }),
      prisma.user.delete({
        where: { UserID: parsedId },
      }),
    ]);

   // revalidatePath("/list/agents");
    return { success: true, error: false };
  } catch (err) {
    console.error("Deletion failed:", err);
    return { success: false, error: true };
  }
};