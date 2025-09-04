package syntaxparameter.functionquestion;

import java.util.Scanner;

public class Fn1 {
    

    public static double averagenumber(double a,double b,double c){

        return (a + b + c)/3;
        
    }
        public static void main(String[] args) {
        
        Scanner ft = new Scanner(System.in);

        double a = ft.nextDouble();
        double b = ft.nextDouble();
        double c = ft.nextDouble();

        double avg = averagenumber(a, b, c);
        System.out.println("Average" + avg);
    }
}
