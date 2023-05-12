// console.log(new Date())
// console.log(Date())
const present = {
	time:{
		hour:Date().split(' ')[4].split(':')[0],
		minute:Date().split(' ')[4].split(':')[1]
	},
	day:{
		index:new Date().getDate(),
		weekday : Date().split(' ')[0]
	},
	month:{
		index:new Date().getMonth(),
		name: Date().split(' ')[1]
	},
	year:Date().split(' ')[3]
}

// console.log({present})