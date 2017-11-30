/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import javax.ws.rs.Consumes;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import utilities.ErrorUtil;
import utilities.JsonUtil;
import utilities.TokenUtil;

/**
 *
 * @author HUYTRINH
 */

@Path("/photo")
public class FileUpload {
    
    private static final String SERVER_UPLOAD_LOCATION_FOLDER = "C://Users/HUYTRINH/Desktop/BookReview/src/main/webapp/images/uploaded/";
    private static final String IMG_URL_PREFIX = "./images/uploaded/";

	/**
	 * Upload a File
	 */
	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response uploadFile(
                        @HeaderParam("authorization") String token,
			@FormDataParam("file") InputStream fileInputStream,
			@FormDataParam("file") FormDataContentDisposition contentDispositionHeader) {
            
            Long id = TokenUtil.decodeToken(token);
            if (id != null) {
                 if ( contentDispositionHeader.getFileName() == null) {
                     System.out.println("book cover is empty");
                     return Response.status(Response.Status.BAD_REQUEST)
                        .entity(ErrorUtil.badRequest("Please choose book cover photo"))
                        .build();
                 }
                 String imgName = System.currentTimeMillis() + contentDispositionHeader.getFileName();
                 String filePath = SERVER_UPLOAD_LOCATION_FOLDER + imgName;
                 String imgUrl =  IMG_URL_PREFIX + imgName;

            // save the file to the server
            saveFile(fileInputStream, filePath);

            String output = JsonUtil.jsonToken("url", imgUrl);

            return Response.ok(output).build();

            } else {
                return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(ErrorUtil.unAuthorized("Invalid token"))
                    .build();
            }           
	}

	// save uploaded file to a defined location on the server
	private void saveFile(InputStream uploadedInputStream,
			String serverLocation) {
		try {
			OutputStream outpuStream = new FileOutputStream(new File(serverLocation));
			int read = 0;
			byte[] bytes = new byte[1024];

			outpuStream = new FileOutputStream(new File(serverLocation));
			while ((read = uploadedInputStream.read(bytes)) != -1) {
				outpuStream.write(bytes, 0, read);
			}
			outpuStream.flush();
			outpuStream.close();
		} catch (IOException e) {

			e.printStackTrace();
		}

	}
}
