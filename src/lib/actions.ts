"use server";

import { revalidatePath } from "next/cache";
import { AgentSchema } from "./formValidationSchemas";
import prisma from "./prisma";
import { error } from "console";
import { boolean } from "zod";

type CurrentState = {success: boolean; error: boolean}

export const createAgent = async ( 
  currentState: CurrentState,
  data: AgentSchema) => {
  try {
    // Check if the user already exists by email or username
    const user = await prisma.user.findUnique({
      where: {
        Email: data.email,  // You could also check by username if needed
      },
    });

    revalidatePath("/list/agents")

    // If the user doesn't exist, create a new user
    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          Email: data.email,
          UserName: data.userName,
          Password: data.password ?? "",
        },
      });

      // Create the agent and link it to the new user
      await prisma.agent.create({
        data: {
          FirstName: data.firstName,
          LastName: data.lastName,
          OfficeAddress: data.officeAddress,
          HomeAddress: data.homeAddress,
          City: data.city,
          User: {
            connect: {
              UserID: newUser.UserID,  // Link the agent with the new user
            },
          },
        },
      });
    } else {
      // If the user already exists, just create the agent and link it to the existing user
      await prisma.agent.create({
        data: {
          FirstName: data.firstName,
          LastName: data.lastName,
          OfficeAddress: data.officeAddress,
          HomeAddress: data.homeAddress,
          City: data.city,
          User: {
            connect: {
              UserID: user.UserID,  // Link the agent with the existing user
            },
          },
        },
      });
    }
    return {success: true, error: false };

  } catch (err) {
    return {success: false, error: true };
  }
};









// export const deleteSubject = async (
//   currentState: CurrentState,
//   data: FormData
// ) => {
//   const id = data.get("id") as string;
//   try {
//     await prisma.subject.delete({
//       where: {
//         id: parseInt(id),
//       },
//     });

//     // revalidatePath("/list/subjects");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };