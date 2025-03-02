-- CreateTable
CREATE TABLE "User" (
    "UserID" SERIAL NOT NULL,
    "Email" TEXT NOT NULL,
    "UserName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Agent" (
    "AgentID" INTEGER NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "OfficeAddress" TEXT,
    "HomeAddress" TEXT,
    "City" TEXT NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("AgentID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_AgentID_fkey" FOREIGN KEY ("AgentID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;
