// package syntaxparameter;

// public class factorial {

//     public static int factorialNum(int n){
        
//         int f =1;
//         for(int i=1;i<=n;i++){
//             f = f*i;
//         }
//         return f;
//     }
//    public static void main(String[] args) {
//     System.out.println(factorialNum(5));
    
//    } 
//  }
package syntaxparameter;

public class factorial {

    public static int factorialNum(int n) {
        int f = 1;
        for (int i = 1; i <= n; i++) {
            f *= i;
        }
        return f;
    }

    public static int binofactorial(int n, int r) {

        int fact_n = factorialNum(n);
        int fact_r = factorialNum(r);
        int fact_nmr = factorialNum(n - r);

        int binomial = fact_n / (fact_r * fact_nmr);
        return binomial;
    }

    public static void main(String[] args) {
        System.out.println(binofactorial(7, 4));
    }
}





