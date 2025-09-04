package syntaxparameter;

public class bintodec {

    public static void binToDec(int binnum) {

        int pow = 0;
        int decNum = 0;

        while (binnum > 0) {
            int lastDigit = binnum % 10;
            decNum = decNum + (lastDigit * (int) Math.pow(2, pow));

            pow++;
        }

    }

    public static void main(String[] args) {
        binToDec(101);
    }

}
