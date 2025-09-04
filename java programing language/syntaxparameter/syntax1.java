// package syntaxparameter;

// import java.util.Scanner;

// public class syntax1 {

//     public static void calculateSum(int a ,int b) {
        

//         int sum = a + b;
//         System.out.println("sum is equal to = "  +sum);
//     }

//     public static void main(String[] args) {
//         Scanner ft = new Scanner(System.in);

//         System.out.println("enter the value of a");
//         int a = ft.nextInt();

//         System.out.println("enter the value of b");
//         int b = ft.nextInt();
//         calculateSum(a,b);
//     }
// }
//

//second method

package syntaxparameter;

import java.util.Scanner;

public class syntax1 {

    public static int calculateSum(int a ,int b) {
        

        int sum = a + b;
        return sum;
      
    }

    public static void  main(String[] args) {
        Scanner ft = new Scanner(System.in);

        System.out.println("enter the value of a");
        int a = ft.nextInt();

        System.out.println("enter the value of b");
        int b = ft.nextInt();
        int sum =calculateSum(a,b);
        System.out.println("sum is equal to = "  +sum);
    }
}