import { Branch } from "./branch.entity";
import { Company } from "./company.entity";
import { EventTokenEntity } from "./EventToken.entity";
import { Student } from "./student.entity";
import { studentAddress } from "./studentaddress.entity";
import { formQuestion } from "./formQuestionnaire";
import { EventsEntity } from "./Events.entity";
import { EventStudent } from "./EventStudent.entity";
import { Diary } from "./diary.entity";
import { DiaryDetail } from "./diaryDetail.entity";
import { Users } from "./users.entity";
import { userLevel } from "./users_level.entity";
import { FormInTP08 } from "./formintp08.entity";
import { FormInTP09 } from "./formintp09.entity";
import { AssessmentHeader } from "./assessmentHeader.entity";
import { AssessmentDetail } from "./assessmentDetail.entity";
import { UserAssessment } from "./UserAssessment.entity";

const IndexEntity = [
    EventTokenEntity,
    EventStudent,
    EventsEntity,
    formQuestion,
    Student,
    studentAddress,
    Branch,
    Company,
    Diary,
    DiaryDetail,
    Users,
    userLevel,
    FormInTP08,
    FormInTP09,
    AssessmentHeader,
    AssessmentDetail,
    UserAssessment,
]

export default IndexEntity;