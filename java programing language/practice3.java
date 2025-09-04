import java.util.Scanner;

public class practice3 {
    public static void main(String[] args) {
        Scanner ft = new Scanner(System.in);
        System.out.println("enter ypur value");

        int week = ft.nextInt();

        switch (week) {
            case 1:
                System.out.println("monday");
                break;
            case 2:
                System.out.println("tuesday");
                break;
            case 3:
                System.out.println("wednessday");
                break;
            case 4:
                System.out.println("thurusday");
                break;
            case 5:
                System.out.println("friday");
                break;
            case 6:
                System.out.println("saturday");
                break;
            case 7:
                System.out.println("sunday");
                break;
            default:
            System.out.println("you enter wrong value");
                break;
        }
    }
}
