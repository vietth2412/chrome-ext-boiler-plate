export interface IAddTimesheetParams {
    projectID: number;
    activityID: number;
    start_day: string;
    end_day: string;
    start_time: string;
    end_time: string;
    duration: string;
    userID: number[]
}
export const getAssets = () => {
    const data = new URLSearchParams();
    data.append('axAction', 'add_edit_timeSheetEntry')
    return fetch(
        'http://timesheet.powergatevn.com/extensions/ki_timesheets/floaters.php',
        {
            method: "POST",
            headers: {
            },
            body: data
        }
    )
}

export const addTimesheet = (params: IAddTimesheetParams) => {
    const inputData = {
        ...params,
        axAction: 'add_edit_timeSheetEntry',
        statusID: 3,
        billable: 0
    }
    const body = new URLSearchParams();
    for (const key in inputData) {
        body.append(key, inputData[key])
    }
    return fetch(
        'http://timesheet.powergatevn.com/extensions/ki_timesheets/processor.php',
        {
            method: "POST",
            headers: {
            },
            body
        }
    )
}