interface IData {
    total_trans: number;
    total_amount: number;
    date: string;
}


const data: IData[] = [
        {
        total_amount: 343,
        total_trans: 12,
        date: '2023-10-18'
    },

    {
        total_amount: 343,
        total_trans: 12,
        date: '2024-01-01'
    },
    {
        total_amount: 343,
        total_trans: 12,
        date: '2024-02-02'
    },
    {
        total_amount: 343,
        total_trans: 12,
        date: '2024-03-03'
    },
    {
        total_amount: 343,
        total_trans: 12,
        date: '2024-04-04'
    },
    {
        total_amount: 343,
        total_trans: 12,
        date: '2024-10-04'
    },
    {
        total_amount: 343,
        total_trans: 12,
        date: '2024-9-04'
    }
]


function filterDataByMonth(month: number = 0) {
    const todayDate = new Date();
    const filterDate = new Date(new Date().setMonth(new Date().getMonth() - month))

    console.log('todayDate: ', todayDate)
    console.log('filterDate: ', filterDate)

    const filterData = data.map(el => {
        if (
            new Date(el.date) >= filterDate
            && new Date(el.date) <= todayDate
        ) {
            return {...el}
        }
        else {
            return {
                ...el,
                total_amount: 0,
                total_trans: 0
            }
        }
    });
    return filterData;
}

const filterData = filterDataByMonth(11)

console.log('filterData: ', filterData)