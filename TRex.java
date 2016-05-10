import com.teamdev.jxbrowser.chromium.Browser;
import com.teamdev.jxbrowser.chromium.swing.BrowserView;
import com.teamdev.jxbrowser.chromium.events.ConsoleEvent;
import com.teamdev.jxbrowser.chromium.events.ConsoleListener;

import java.awt.*;
import javax.swing.*;
import java.awt.event.*;

public class TRex
{
	static JLabel lbl_confidence_up;
	static JLabel lbl_confidence_down;
	static JLabel lbl_decision;
	static String iFrameSrcUrl = "file:///D:/Projects/T-Rex/index.html";

	public static void main(String[] args)
	{
		//Browser Settings
		Browser chromeBrowser = new Browser();
		BrowserView browserView = new BrowserView(chromeBrowser);
		chromeBrowser.addConsoleListener(new ConsoleListener()
		{
    		public void onMessage(ConsoleEvent event)
    		{
    			String message = event.getMessage();
    			if (message.startsWith("[lbl_confidence_up]"))
    				lbl_confidence_up.setText("KeyUp: " + message.split(" ")[1]);

    			if (message.startsWith("[lbl_confidence_down]"))
    				lbl_confidence_down.setText("KeyDown: " + message.split(" ")[1]);

    			if (message.startsWith("[lbl_decision]"))
    				lbl_decision.setText("Decision: " + message.split(" ")[1]);
        		//System.out.println("Message: " + message);
    		}
		});
		browserView.setPreferredSize(new Dimension(600, 160));
		
		//mainPanel Configurations
		JPanel mainPanel = new JPanel();
		mainPanel.setLayout(new GridLayout(1, 4, 10, 0));
		
		//mainPanel components
		lbl_confidence_up 	= new JLabel("KeyUp: N/A");
		lbl_confidence_down = new JLabel("KeyDown: N/A");
		lbl_decision 		= new JLabel("Decision: N/A");

		JButton btn_refresh = new JButton();
		btn_refresh.setText("Reset Network");
		btn_refresh.addActionListener(new ActionListener()
		{
  			public void actionPerformed(ActionEvent e)
  			{
    			chromeBrowser.loadURL(iFrameSrcUrl);
  			}
		});

		mainPanel.add(lbl_confidence_up);
		mainPanel.add(lbl_confidence_down);
		mainPanel.add(lbl_decision);
		mainPanel.add(btn_refresh);
 		
 		//JFrame Settings
		JFrame mainWindow = new JFrame("T-Rex Game Player");
		mainWindow.add(browserView, BorderLayout.NORTH);
		mainWindow.add(mainPanel, BorderLayout.SOUTH);
		mainWindow.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		mainWindow.pack();
		mainWindow.setVisible(true);

		chromeBrowser.loadURL(iFrameSrcUrl);
	}
}