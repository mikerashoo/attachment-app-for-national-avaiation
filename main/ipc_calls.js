export const USER_CRUD_CALLS = {
    getAllUsersCall: 'get-all-users',
    createUserCall: 'create-user',
    userLoginCall: 'login-user',
}

export const PAYMENT_CRUD_CALLS = {
    fetchPaymentTypesCall: 'get-all-payment-types',
    createPaymentTypeCall: 'create-payment-type',
    checkAndInitializePaymentTypesCall:'check-and-initialize-payment-types',
    changePaymentTypeStatusCall: 'change-payment-type-status',
    addPaymentCall: 'add-payment-call',
    fetchPaymentFormsCall: 'get-all-payment-forms',
    createPaymentFormCall: 'create-payment-form',
    fetchPaymentFormDataCall: 'get-payment-form-data',
    changePaymentFormStateCall: 'change-payment-form-status',
    fetchPaymentFormsForDepartementCall: 'fetch-payment-forms-for-departement',
    savePaymentCall: 'save-payment',
    fetchPaymentsCall: 'get-all-payments',
    getPaymentDetailsCall: 'get-payment-details',
    getMonthlyPaymentResports: 'get-monthly-payment-resports',
    getStudentPaymentReports: 'get-student-payment-resports',
}

export const DEPARTEMENT_CRUD_CALLS = {
    getAllDepartementsCall: 'get-all-departements',
    createDepartementCall: 'create-departement',
    deleteDepartementCall: 'delete-departement',
}

export const STUDENT_CRUD_CALLS = {
    getAllStudentsCall: 'get-all-students',
    createStudentCall: 'create-student',
    deleteStudentCall: 'delete-student',
    getStudentsWithLessData: 'get-students-with-less-data',
    searchStudentsById: 'search-students-by-id',
    getStudentPaymentFormInformation: 'get-student-payment-form-information',
}

export const EXPORT_IMPORT_CALLS = {
    exportDbCalls: 'export-db-calls',
    importDbCalls: 'import-db-calls',
    importDbDoneCalls: 'import-db-done-calls',
}