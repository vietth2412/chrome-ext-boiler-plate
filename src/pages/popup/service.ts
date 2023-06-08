import { getAssets } from "@src/api"

export const syncData = async () => {
    const projects = []
    const activities = []
    const res = await getAssets()
    const htmlText = await res.text()
    var div = document.createElement('div');
    div.innerHTML = htmlText;
    const projectOptions = div.querySelector('#add_edit_timeSheetEntry_projectID').querySelectorAll('option')
    const activityOptions = div.querySelector('#add_edit_timeSheetEntry_activityID').querySelectorAll('option')
    projectOptions.forEach(e => {
        const option = {
            value: e.value,
            label: e.label
        }
        projects.push(option)
    })
    activityOptions.forEach(e => {
        const option = {
            value: e.value,
            label: e.label
        }
        activities.push(option)
    })
    return {
        projects,
        activities
    }
}