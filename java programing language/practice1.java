import java.util.Scanner;

public class practice1 {

    public static void main(String[] args) {
        Scanner ft = new Scanner(System.in);
        System.out.print("enter the number: ");
        int a = ft.nextInt();

        if(a>0){
            System.out.println("positive");
        }
        else{
            System.out.println("negative");
        }

    }
}
