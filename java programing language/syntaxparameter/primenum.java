// package syntaxparameter;

// public class primenum {

//     // public static boolean isPrime(int n) {
//     // if (n <= 1) return false;
//     // boolean isPrime = true;
//     // for (int i = 2; i <= n - 1; i++) {

//     // if (n % i == 0) {
//     // isPrime = false;
//     // break;
//     // }
//     // }

//     // return isPrime;
//     // }

//    public static boolean isPrime(int n){
// if(n == 2){
//     return true;
// }
//         for(int i=2;i<=Math.sqrt(n);i++){

//             if(n%i == 0){
// return false;
//             }
//         }
//         return true;
//     }

// public static void primeInRange(int n){
//     for(int i=2;i<=n;i++){
//         if(isPrime(i)){
//             System.out.println(i+"");
//         }

//     }
    
// }

//     public static void main(String[] args) {
//         primeInRange(30);
//     }

// }

package syntaxparameter;

public class primenum {

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

