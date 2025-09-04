import java.util.Scanner;

public class practice2 {
    public static void main(String[] args) {
        System.out.println("enter the temperatur");
        Scanner ft = new Scanner(System.in);

        double temp = 103.5;
        
         if(temp>100){
            System.out.println("i am sufffering from fever");
         }
         else{
            System.out.println("i am good  i donot have fever");
         }
    }
}
