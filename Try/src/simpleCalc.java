import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class simpleCalc implements ActionListener{
    //main components
    JFrame frame;
    JTextField textfield;
    JButton[] numButtons = new JButton[10];
    JButton[] funcButtons = new JButton[9];
    JButton aButton, sButton, mButton, dButton;
    JButton decButton, eqButton, delButton, clrButton, negButton;
    JPanel panel;
    
    Font myFont= new Font("Inter",Font.PLAIN, 23); //fontstyle and size of text and buttons

    //variables to compute operations
    double num1=0, num2=0, result=0;
    char operator;

    simpleCalc(){
        //constructor 
        //create calculator frame
        frame = new JFrame("Calculator");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(360, 500);
        frame.setLayout(null);
        frame.getContentPane().setBackground(Color.decode("#a8c0ce"));

        // textfield - pangdisplay ng numbers and res
        textfield = new JTextField();
        textfield.setBounds(50, 25, 250, 50);       
        textfield.setFont(myFont);
        textfield.setEditable(true); // used to click or type buttons 
        textfield.setBackground(Color.decode("#ecf1f4"));
        textfield.setForeground(Color.decode("#22343e"));

        //function buttpns
        aButton = new JButton("+");
        sButton = new JButton("-");
        mButton = new JButton("*");
        dButton = new JButton("/");
        decButton = new JButton(".");
        eqButton = new JButton("=");
        delButton = new JButton("Del");
        clrButton = new JButton("Clr");
        negButton = new JButton("(-)");

        funcButtons[0] = aButton;
        funcButtons[1] = sButton;
        funcButtons[2] = mButton;
        funcButtons[3] = dButton;
        funcButtons[4] = decButton;
        funcButtons[5] = eqButton;
        funcButtons[6] = delButton;
        funcButtons[7] = clrButton;
        funcButtons[8] = negButton;

        //LOOPS
        // to set up all the function buttpns
        for(int i = 0; i < 9; i++){
            funcButtons[i].addActionListener(this);
            funcButtons[i].setFont(myFont);
            funcButtons[i].setFocusable(false);
        }

        //to create ng num buttons
        for(int i=0; i < 10; i++){
            numButtons[i] = new JButton(String.valueOf(i));
            numButtons[i].addActionListener(this);
            numButtons[i].setFont(myFont);
            numButtons[i].setFocusable(false);
        }

        //manual place ment for negative, delete and clear
        negButton.setBounds(50, 385, 70, 45);
        delButton.setBounds(140, 385, 70, 45);
        clrButton.setBounds(230, 385, 70, 45);

        //panel for number & operator buttons, 4x4 grid
        panel = new JPanel();
        panel.setBounds(50, 100, 250, 250);
        panel.setLayout(new GridLayout(4,4,10,10));
        panel.setBackground(Color.decode("#a8c0ce"));

        // buttons sa panel in calculator layout
        panel.add(numButtons[1]);
        panel.add(numButtons[2]);
        panel.add(numButtons[3]);
        panel.add(aButton);
        panel.add(numButtons[4]);
        panel.add(numButtons[5]);
        panel.add(numButtons[6]);
        panel.add(sButton);
        panel.add(numButtons[7]);
        panel.add(numButtons[8]);
        panel.add(numButtons[9]);
        panel.add(mButton);
        panel.add(decButton);
        panel.add(numButtons[0]);
        panel.add(eqButton);
        panel.add(dButton);


        frame.add(panel);
        frame.add(negButton);
        frame.add(delButton);
        frame.add(clrButton);
        frame.add(textfield);
        frame.setVisible(true);
        
    }

    public static void main(String[] args){
        new simpleCalc();
    }

    
    @Override
    public void actionPerformed(ActionEvent e){

        //kpag clinick num button, madidisplay in textfield
        for(int i=0; i<10; i++){
            if(e.getSource() == numButtons[i]){
                textfield.setText(textfield.getText().concat(String.valueOf(i)));
            }
        }

        // if decimal, check if there's "."
        if(e.getSource()==decButton){
            if (!textfield.getText().contains(".")) { 
                textfield.setText(textfield.getText().concat("."));
            }
        }

        // arithmetic operators
        if(e.getSource()==aButton){
            num1 = Double.parseDouble(textfield.getText());
            operator = '+';
            textfield.setText("");
        }

        if(e.getSource()==sButton){
            num1 = Double.parseDouble(textfield.getText());
            operator = '-';
            textfield.setText("");
        }

        if(e.getSource()==mButton){
            num1 = Double.parseDouble(textfield.getText());
            operator = '*';
            textfield.setText("");
        }

        if(e.getSource()==dButton){
            num1 = Double.parseDouble(textfield.getText());
            operator = '/';
            textfield.setText("");
        }

        // equal
        if(e.getSource()==eqButton){
            num2 = Double.parseDouble(textfield.getText());

            switch(operator){
                case'+':
                result=num1+num2;
                break;
                case'-':
                result=num1-num2;
                break;
                case'*':
                result=num1*num2;
                break;
                case'/':
                result=num1/num2;
                break;
            }
            textfield.setText(String.valueOf(result));
            num1=result;
        } 
        // clear
        if(e.getSource()==clrButton){
            textfield.setText("");
        }

        //delete
        if(e.getSource()==delButton){
            String string = textfield.getText();
            if(string.length() > 0){
                textfield.setText(string.substring(0, string.length() - 1));
            }
        }

        // negative button
        if(e.getSource()==negButton){
            if(!textfield.getText().equals("")){
                double temp = Double.parseDouble(textfield.getText());
                temp*=-1;
                textfield.setText(String.valueOf(temp));
            }
        }
    }
}
