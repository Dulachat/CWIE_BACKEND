import { PartialType } from "@nestjs/mapped-types";
import { CreateAssessmentDetailDto } from "./create-assessmentDetail.dto";

export class UpdateAssessmentDetail extends PartialType(CreateAssessmentDetailDto) {

}