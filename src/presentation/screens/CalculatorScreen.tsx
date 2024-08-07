import { Pressable, Text, View } from "react-native"
import { colors, styles } from "../../config/theme/app-theme"
import { CalculatorButton } from "../components/CalculatorButton"
import { useCalculator } from "../hooks/useCalculator"


export const CalculatorScreen = () => {

	const {
		number,
		prevNumber,
		buildNumber,
		toggleSign,
		clean,
		deleteOperation,
		divideOperation,
		multiplyOperation,
		subtractOperation,
		addOperation,
		calculateResult,
	} = useCalculator();


	return (
		<View style={styles.calculatorContainer}>

			<View style={{ paddingHorizontal: 30, paddingBottom: 20 }}>
				<Text
					adjustsFontSizeToFit //hace que se adapte al espacio que tiene
					numberOfLines={1} // solo quiero una linea
					style={styles.mainResult}>{number}</Text>
				<Text
					adjustsFontSizeToFit
					numberOfLines={1}
					style={styles.subResult}>
					{(prevNumber === '0')? '' : prevNumber}
				</Text>
			</View>

			<View style={styles.row}>

				<CalculatorButton onPress={clean} label="C" color={colors.lightGray} balckText />
				<CalculatorButton onPress={toggleSign} label="+/-" color={colors.lightGray} balckText />
				<CalculatorButton onPress={deleteOperation} label="del" color={colors.lightGray} />
				<CalculatorButton onPress={divideOperation} label="/" color={colors.orange} />

			</View>
			<View style={styles.row}>

				<CalculatorButton onPress={() => buildNumber('8')} label="8" color={colors.darkGray} />
				<CalculatorButton onPress={() => buildNumber('7')} label="7" color={colors.darkGray} />
				<CalculatorButton onPress={() => buildNumber('9')} label="9" color={colors.darkGray} />
				<CalculatorButton onPress={multiplyOperation} label="x" color={colors.orange} />

			</View>
			<View style={styles.row}>

				<CalculatorButton onPress={() => buildNumber('4')} label="4" color={colors.darkGray} />
				<CalculatorButton onPress={() => buildNumber('5')} label="5" color={colors.darkGray} />
				<CalculatorButton onPress={() => buildNumber('6')} label="6" color={colors.darkGray} />
				<CalculatorButton onPress={subtractOperation} label="-" color={colors.orange} />

			</View>
			<View style={styles.row}>

				<CalculatorButton onPress={() => buildNumber('1')} label="1" />
				<CalculatorButton onPress={() => buildNumber('2')} label="2" />
				<CalculatorButton onPress={() => buildNumber('3')} label="3" />
				<CalculatorButton onPress={addOperation} label="+" color={colors.orange} />

			</View>

			<View style={styles.row}>

				<CalculatorButton onPress={() => buildNumber('0')} label="0" doubleSize />
				<CalculatorButton onPress={() => buildNumber('.')} label="." />
				<CalculatorButton onPress={calculateResult} label="=" color={colors.orange} />

			</View>
		</View>
	)
}
