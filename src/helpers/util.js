exports.array = {};

exports.array.unique = arr => (
	arr.filter((element, index, self) => (
		self.indexOf(element) === index
	))
)

exports.array.diff = (a, b) => (
	a.filter(element => (
        b.indexOf(element) === -1
    ))
)