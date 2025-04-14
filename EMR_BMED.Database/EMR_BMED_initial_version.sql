USE [master]
GO
/****** Object:  Database [EMR_BMED]    Script Date: 3/8/2025 2:37:51 PM ******/
CREATE DATABASE [EMR_BMED]
GO
ALTER DATABASE [EMR_BMED] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [EMR_BMED].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [EMR_BMED] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [EMR_BMED] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [EMR_BMED] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [EMR_BMED] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [EMR_BMED] SET ARITHABORT OFF 
GO
ALTER DATABASE [EMR_BMED] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [EMR_BMED] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [EMR_BMED] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [EMR_BMED] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [EMR_BMED] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [EMR_BMED] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [EMR_BMED] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [EMR_BMED] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [EMR_BMED] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [EMR_BMED] SET  DISABLE_BROKER 
GO
ALTER DATABASE [EMR_BMED] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [EMR_BMED] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [EMR_BMED] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [EMR_BMED] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [EMR_BMED] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [EMR_BMED] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [EMR_BMED] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [EMR_BMED] SET RECOVERY FULL 
GO
ALTER DATABASE [EMR_BMED] SET  MULTI_USER 
GO
ALTER DATABASE [EMR_BMED] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [EMR_BMED] SET DB_CHAINING OFF 
GO
ALTER DATABASE [EMR_BMED] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [EMR_BMED] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [EMR_BMED] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [EMR_BMED] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'EMR_BMED', N'ON'
GO
ALTER DATABASE [EMR_BMED] SET QUERY_STORE = ON
GO
ALTER DATABASE [EMR_BMED] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [EMR_BMED]
GO
/****** Object:  Table [dbo].[Medication]    Script Date: 3/8/2025 2:37:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medication](
	[MID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Brand] [nvarchar](50) NOT NULL,
	[Dosage_form] [nvarchar](20) NULL,
	[Administration_route] [nvarchar](30) NULL,
	[Indications] [nvarchar](255) NULL,
	[Contraindications] [nvarchar](255) NULL,
	[Side_effects] [nvarchar](255) NULL,
	[Warnings] [nvarchar](255) NULL,
	[Prescription_req] [bit] NOT NULL,
	[Storing] [nvarchar](50) NULL,
 CONSTRAINT [PK_Medication] PRIMARY KEY CLUSTERED 
(
	[MID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 3/8/2025 2:37:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UID] [int] IDENTITY(1,1) NOT NULL,
	[Surname] [nvarchar](50) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Gender] [nvarchar](10) NOT NULL,
	[Birthday] [date] NOT NULL,
	[Phone] [varchar](16) NULL,
	[Email] [varchar](50) NULL,
	[Allergies] [nvarchar](255) NULL,
	[Intolerances] [nvarchar](255) NULL,
	[Conditions] [nvarchar](255) NULL,
	[Blood] [char](3) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Prescriptions]    Script Date: 3/8/2025 2:37:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Prescriptions](
	[PID] [int] IDENTITY(1,1) NOT NULL,
	[DID] [int] NOT NULL,
	[UID] [int] NOT NULL,
	[Date_issued] [date] NOT NULL,
	[Notes] [nvarchar](255) NULL,
 CONSTRAINT [PK_Prescriptions] PRIMARY KEY CLUSTERED 
(
	[PID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pres_Med]    Script Date: 3/8/2025 2:37:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pres_Med](
	[MPID] [int] IDENTITY(1,1) NOT NULL,
	[MID] [int] NOT NULL,
	[PID] [int] NOT NULL,
	[Dosage] [nvarchar](50) NOT NULL,
	[Duration] [nvarchar](50) NOT NULL,
	[Instructions] [text] NOT NULL,
	[Meal] [bit] NOT NULL,
	[Fixed] [bit] NOT NULL,
 CONSTRAINT [PK_Pres_Med] PRIMARY KEY CLUSTERED 
(
	[MPID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[display_reteta_pentru_user]    Script Date: 3/8/2025 2:37:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- test 1: verificare display reteta atunci cand o va vizualiza user-ul
CREATE   VIEW [dbo].[display_reteta_pentru_user]
AS
SELECT 
	p.PID,			-- for testing purposes	
	u.UID,			-- for testing purposes
	m.MID,			-- for testing purposes
	u.Name			AS User_Name,
	u.Surname		AS User_Surname,
	m.Name			AS Med_Name,	
	m.Dosage_form,
	m.Administration_route
FROM [dbo].[Prescriptions]		p
	JOIN [dbo].[Users]			u	ON	p.UID = u.UID
	JOIN [dbo].[Pres_Med]		pm	ON	p.PID = pm.PID
	JOIN [dbo].[Medication]		m	ON	m.MID = pm.MID
WHERE u.UID = 1;
		
GO
/****** Object:  Table [dbo].[Doctors]    Script Date: 3/8/2025 2:37:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Doctors](
	[DID] [int] IDENTITY(1,1) NOT NULL,
	[Surname] [nvarchar](20) NOT NULL,
	[Name] [nvarchar](30) NOT NULL,
	[Gender] [nvarchar](10) NOT NULL,
	[Phone] [varchar](16) NULL,
	[Email] [varchar](50) NULL,
	[Address] [nvarchar](100) NULL,
	[Field] [nvarchar](100) NULL,
 CONSTRAINT [PK_Doctors] PRIMARY KEY CLUSTERED 
(
	[DID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[display_retete_doctori]    Script Date: 3/8/2025 2:37:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- test 2: verificare display ce retete au scris doctorii in functie de pacient
CREATE   VIEW [dbo].[display_retete_doctori]
AS
SELECT
	p.PID,			-- for testing purposes
	d.DID,			-- for testing purposes
	m.MID,			-- for testing purposes
	d.Name			AS	doctor_name,
	d.Surname		AS	doctor_surname,
	p.Date_issued,	-- cand a fost eliberata reteta
	m.Name			AS	med_name,
	m.Dosage_form,
	m.Administration_route
FROM [dbo].[Doctors]				d
	JOIN [dbo].[Prescriptions]		p	ON p.DID = d.DID	-- sa legi de cine a scris reteta
	JOIN [dbo].[Users]				u	ON p.UID = u.UID	-- pentru ca sa cauti reteta dupa numele userului
	JOIN [dbo].[Pres_Med]			pm	ON p.PID = pm.PID	-- legi prescriptia de medicamente
	JOIN [dbo].[Medication]			m	ON M.MID = pm.MID	-- ce medicamente sunt in reteta (efectiv)
WHERE u.Name = 'Miruna' AND u.Surname = 'Capricioasa'
GO
ALTER TABLE [dbo].[Pres_Med]  WITH CHECK ADD  CONSTRAINT [FK_Pres_Med_Medication] FOREIGN KEY([MID])
REFERENCES [dbo].[Medication] ([MID])
GO
ALTER TABLE [dbo].[Pres_Med] CHECK CONSTRAINT [FK_Pres_Med_Medication]
GO
ALTER TABLE [dbo].[Pres_Med]  WITH CHECK ADD  CONSTRAINT [FK_Pres_Med_Prescriptions] FOREIGN KEY([PID])
REFERENCES [dbo].[Prescriptions] ([PID])
GO
ALTER TABLE [dbo].[Pres_Med] CHECK CONSTRAINT [FK_Pres_Med_Prescriptions]
GO
ALTER TABLE [dbo].[Prescriptions]  WITH CHECK ADD  CONSTRAINT [FK_Prescriptions_Doctors] FOREIGN KEY([DID])
REFERENCES [dbo].[Doctors] ([DID])
GO
ALTER TABLE [dbo].[Prescriptions] CHECK CONSTRAINT [FK_Prescriptions_Doctors]
GO
ALTER TABLE [dbo].[Prescriptions]  WITH CHECK ADD  CONSTRAINT [FK_Prescriptions_Users] FOREIGN KEY([UID])
REFERENCES [dbo].[Users] ([UID])
GO
ALTER TABLE [dbo].[Prescriptions] CHECK CONSTRAINT [FK_Prescriptions_Users]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Users] FOREIGN KEY([UID])
REFERENCES [dbo].[Users] ([UID])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Users]
GO
USE [master]
GO
ALTER DATABASE [EMR_BMED] SET  READ_WRITE 
GO
