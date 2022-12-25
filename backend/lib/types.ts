export interface ShiftsRequestQuery {
    all: boolean;
}

export interface ShiftRequestParams {
    shiftId: string;
}

export interface SignupRequestBody {
    userId: string;
}

export type AccountsShiftsRequestParams = SignupRequestBody;
