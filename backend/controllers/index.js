const admin = require('./admin.js')
const auth = require('./auth.js')
const course_los = require('./course_los.js')
const course_plan_assessments = require('./course_plan_assessments.js')
const course_plan_details = require('./course_plan_details.js')
const course_plan_references = require('./course_plan_references.js')
const courses = require('./courses.js')
const dosen = require('./dosen.js')
const lecturers = require('./lecturers.js')
const mhs = require('./mhs.js')
const RPS = require('./RPS')
const user = require('./users.js')

const controllers = {}

controllers.admin = admin
controllers.auth = auth
controllers.course_los = course_los
controllers.course_plan_assessments = course_plan_assessments
controllers.course_plan_details = course_plan_details
controllers.course_plan_references = course_plan_references
controllers.courses = courses
controllers.dosen = dosen
controllers.lecturers = lecturers
controllers.mhs = mhs
controllers.RPS = RPS
controllers.user = user

module.exports = controllers