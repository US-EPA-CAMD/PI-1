--SET DATABASE
\c cgawsbrokerprodg1t1yiwikl6s1rs

CREATE SCHEMA "CAMDMD" AUTHORIZATION uwoha4melpr2pzxq;

CREATE TABLE "CAMDMD"."COUNTY_CODE" (
  "COUNTY_CD" VARCHAR(8) NOT NULL, 
	"COUNTY_NUMERIC" VARCHAR(3) NOT NULL, 
	"COUNTY_NAME" VARCHAR(45) NOT NULL, 
	"STATE_CD" VARCHAR(2) NOT NULL, 
	CONSTRAINT "PK_COUNTY_CODE" PRIMARY KEY ("COUNTY_CD")
);
COMMENT ON COLUMN "CAMDMD"."COUNTY_CODE"."COUNTY_CD" IS 'Concatenation of State and county NUMERIC.';
COMMENT ON COLUMN "CAMDMD"."COUNTY_CODE"."COUNTY_NUMERIC" IS 'The FIPS county code/NUMERIC for the county in which the facility" IS located.';
COMMENT ON COLUMN "CAMDMD"."COUNTY_CODE"."COUNTY_NAME" IS 'Full description of county code.';
COMMENT ON COLUMN "CAMDMD"."COUNTY_CODE"."STATE_CD" IS 'State abbreviation for state in which FACILITY, CONTACT, AGENCY, ACCOUNT REQUEST, PROGRAM, or STAFF" IS located.';
COMMENT ON TABLE "CAMDMD"."COUNTY_CODE" IS 'Look up table for county codes.';

CREATE TABLE "CAMDMD"."EPA_REGION_CODE" (
  "EPA_REGION_CD" NUMERIC(2,0) NOT NULL, 
	"EPA_REGION_DESCRIPTION" VARCHAR(1000),
 CONSTRAINT "PK_EPA_REGION_CODE" PRIMARY KEY ("EPA_REGION_CD"), 
	CONSTRAINT "UQ_EPA_REGION_DESC" UNIQUE ("EPA_REGION_DESCRIPTION")
);
COMMENT ON COLUMN "CAMDMD"."EPA_REGION_CODE"."EPA_REGION_CD" IS 'The EPA Region in which a FACILITY" IS located.';
COMMENT ON COLUMN "CAMDMD"."EPA_REGION_CODE"."EPA_REGION_DESCRIPTION" IS 'Description of EPA REGION code.';
COMMENT ON TABLE "CAMDMD"."EPA_REGION_CODE" IS 'List of EPA regions and descriptions.';

CREATE TABLE "CAMDMD"."OPERATING_STATUS_CODE" (
  "OP_STATUS_CD" VARCHAR(7) NOT NULL, 
	"OP_STATUS_DESCRIPTION" VARCHAR(1000) NOT NULL, 
	CONSTRAINT "PK_OPERATING_STATUS_CODE" PRIMARY KEY ("OP_STATUS_CD"), 
	CONSTRAINT "UQ_OPERATING_STATUS_CODE_DESC" UNIQUE ("OP_STATUS_DESCRIPTION")
);
COMMENT ON COLUMN "CAMDMD"."OPERATING_STATUS_CODE"."OP_STATUS_CD" IS 'UNIT operating status (retired or operating) code.';
COMMENT ON COLUMN "CAMDMD"."OPERATING_STATUS_CODE"."OP_STATUS_DESCRIPTION" IS 'Description of operating status codes.';
COMMENT ON TABLE "CAMDMD"."OPERATING_STATUS_CODE" IS 'Operating status codes for units.';

CREATE TABLE "CAMDMD"."PROGRAM_CODE" (
  "PRG_CD" VARCHAR(8) NOT NULL, 
	"PRG_DESCRIPTION" VARCHAR(1000) NOT NULL, 
	"ALLOW_COMP_IND" NUMERIC(1,0) DEFAULT 0 NOT NULL, 
	"COMP_PARAMETER_CD" VARCHAR(7),
	"FIRST_COMP_YEAR" NUMERIC(4,0),
	"OS_IND" NUMERIC(1,0) DEFAULT 0 NOT NULL, 
	"PENALTY_FACTOR" NUMERIC(1,0),
	"TRADING_END_DATE" DATE,
	"GENERATOR_IND" NUMERIC(1,0) DEFAULT 0 NOT NULL, 
	"PRG_GROUP_CD" VARCHAR(8),
	"FED_IND" NUMERIC(1,0) DEFAULT 0 NOT NULL, 
	"INDIAN_COUNTRY_IND" NUMERIC(1,0) DEFAULT 0 NOT NULL, 
	"EGU_ONLY_IND" NUMERIC(1,0) DEFAULT 0 NOT NULL, 
	"REP_REQUIRED_IND" NUMERIC(1,0) DEFAULT 0 NOT NULL, 
	"UNIT_ALLOCATION_IND" NUMERIC(1,0) DEFAULT 0 NOT NULL, 
	"ALLOCATION_CHECK_YEAR" NUMERIC(4,0),
	CONSTRAINT "PK_PROGRAM_CODE" PRIMARY KEY ("PRG_CD"), 
	CONSTRAINT "UQ_PROGRAM_CODE_DESC" UNIQUE ("PRG_DESCRIPTION")
);
COMMENT ON COLUMN "CAMDMD"."PROGRAM_CODE"."PRG_CD" IS 'Code used to identify regulatory PROGRAM applicable to UNIT.';
COMMENT ON COLUMN "CAMDMD"."PROGRAM_CODE"."PRG_DESCRIPTION" IS 'Name of regulatory PROGRAM.';
COMMENT ON COLUMN "CAMDMD"."PROGRAM_CODE"."ALLOW_COMP_IND" IS 'Indicates whether the PROGRAM has allowance based compliance.';
COMMENT ON COLUMN "CAMDMD"."PROGRAM_CODE"."COMP_PARAMETER_CD" IS 'The parameter code reported for a compliance program.';
COMMENT ON COLUMN "CAMDMD"."PROGRAM_CODE"."FIRST_COMP_YEAR" IS 'First compliance year for the PROGRAM.';
COMMENT ON COLUMN "CAMDMD"."PROGRAM_CODE"."OS_IND" IS 'Indicates whether the PROGRAM" IS an Ozone PROGRAM.';
COMMENT ON COLUMN "CAMDMD"."PROGRAM_CODE"."PENALTY_FACTOR" IS 'Ratio applied to excess emissions for penalty deductions for the PROGRAM.';
COMMENT ON COLUMN "CAMDMD"."PROGRAM_CODE"."TRADING_END_DATE" IS 'The date that allowance trading ended for the program.';
COMMENT ON COLUMN "CAMDMD"."PROGRAM_CODE"."GENERATOR_IND" IS 'Indicates whether the PROGRAM requires generator data.';
COMMENT ON COLUMN "CAMDMD"."PROGRAM_CODE"."PRG_GROUP_CD" IS 'Code used to identify regulatory PROGRAM group.';
COMMENT ON COLUMN "CAMDMD"."PROGRAM_CODE"."FED_IND" IS 'Indicates whether the PROGRAM" IS federal or state.';
COMMENT ON COLUMN "CAMDMD"."PROGRAM_CODE"."INDIAN_COUNTRY_IND" IS 'Indicator that PROGRAM has Indian Country land.';
COMMENT ON COLUMN "CAMDMD"."PROGRAM_CODE"."EGU_ONLY_IND" IS 'Indicates whether the PROGRAM only applies for EGU units.';
COMMENT ON COLUMN "CAMDMD"."PROGRAM_CODE"."REP_REQUIRED_IND" IS 'Indicates whether the PROGRAM requires a rep, regardless of allowance data.';
COMMENT ON COLUMN "CAMDMD"."PROGRAM_CODE"."UNIT_ALLOCATION_IND" IS 'Indicates whether the PROGRAM uses unit level allocation.';
COMMENT ON COLUMN "CAMDMD"."PROGRAM_CODE"."ALLOCATION_CHECK_YEAR" IS 'Indicates the first year for which two consecutive non-operating years triggers the loss of existing unit allocations for the unit beginning in the 5th year after the first non-operating year.';
COMMENT ON TABLE "CAMDMD"."PROGRAM_CODE" IS 'Lookup code values for program.';

CREATE TABLE "CAMDMD"."RELATION_TYPE_CODE" (
  "RELATION_TYPE_CD" VARCHAR(7) NOT NULL, 
	"RELATION_DESCRIPTION" VARCHAR(100),
	"ECMPS_ACCESS_TYPE" VARCHAR(1),
	"ECMPS_ACCESS_LEVEL" NUMERIC,
	CONSTRAINT "RELATION_TYPE_CODE_PK" PRIMARY KEY ("RELATION_TYPE_CD")
);
COMMENT ON COLUMN "CAMDMD"."RELATION_TYPE_CODE"."RELATION_TYPE_CD" IS 'Lookup code which defines the scope of the relationship or agent responsibilities.';
COMMENT ON COLUMN "CAMDMD"."RELATION_TYPE_CODE"."RELATION_DESCRIPTION" IS 'Text description of responsibility type for agents.';
COMMENT ON COLUMN "CAMDMD"."RELATION_TYPE_CODE"."ECMPS_ACCESS_TYPE" IS 'ECMPS agent type (retrieve or submit).';
COMMENT ON COLUMN "CAMDMD"."RELATION_TYPE_CODE"."ECMPS_ACCESS_LEVEL" IS 'Hierarchy of ECMPS agent levels.';
COMMENT ON TABLE "CAMDMD"."RELATION_TYPE_CODE" IS 'Lookup table that identifies the relationship type between two PEOPLE.';

CREATE TABLE "CAMDMD"."RESPONSIBILITY" (
  "RESPONSIBILITY_ID" VARCHAR(7) NOT NULL, 
	"RESPONSIBILITY_DESCRIPTION" VARCHAR(400),
	"GROUP_TYPE_CD" VARCHAR(7) NOT NULL, 
	CONSTRAINT "PK_RESPONSIBILITY" PRIMARY KEY ("RESPONSIBILITY_ID")
);
COMMENT ON COLUMN "CAMDMD"."RESPONSIBILITY"."RESPONSIBILITY_ID" IS 'Responsibility key.';
COMMENT ON COLUMN "CAMDMD"."RESPONSIBILITY"."RESPONSIBILITY_DESCRIPTION" IS 'Description of RESPONSIBILITY relationship.';
COMMENT ON COLUMN "CAMDMD"."RESPONSIBILITY"."GROUP_TYPE_CD" IS 'Identifies the type of group for this responsibility.';
COMMENT ON TABLE "CAMDMD"."RESPONSIBILITY" IS 'Lookup table of CONTACT responsibility codes.';

CREATE TABLE "CAMDMD"."STATE_CODE" (
  "STATE_CD" VARCHAR(2) NOT NULL, 
	"STATE_NAME" VARCHAR(20) NOT NULL, 
	"DOMESTIC_IND" NUMERIC(1,0) DEFAULT 0 NOT NULL, 
	"INDIAN_COUNTRY_IND" NUMERIC(1,0) DEFAULT 0 NOT NULL, 
	"EPA_REGION" NUMERIC(2,0),
	CONSTRAINT "STATE_PK" PRIMARY KEY ("STATE_CD")
);
COMMENT ON COLUMN "CAMDMD"."STATE_CODE"."STATE_CD" IS 'Abbreviation for the state.';
COMMENT ON COLUMN "CAMDMD"."STATE_CODE"."STATE_NAME" IS 'Full name of the state.';
COMMENT ON COLUMN "CAMDMD"."STATE_CODE"."DOMESTIC_IND" IS 'Indicator that state" IS in the continental U.S.';
COMMENT ON COLUMN "CAMDMD"."STATE_CODE"."INDIAN_COUNTRY_IND" IS 'Indicator that state has Indian Country land.';
COMMENT ON COLUMN "CAMDMD"."STATE_CODE"."EPA_REGION" IS 'EPA Region in which the state" IS located.';
COMMENT ON TABLE "CAMDMD"."STATE_CODE" IS 'List of state abbreviations and their EPA region.';
